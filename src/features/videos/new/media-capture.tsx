// tslint:disable no-console
import { identity } from 'ramda'
import { Component } from 'react'

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia

// stop hack
// from http://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
const MediaStream = window.MediaStream || window.webkitMediaStream
if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
  MediaStream.prototype.stop = function() {
    this.getAudioTracks().forEach((track) => track.stop())
    this.getVideoTracks().forEach((track) => track.stop())
  }
}

export interface IProps {
  constraints?: MediaStreamConstraints
  timeSlice?: number
  mimeType?: string
  onGranted?: (stream: MediaStream) => void
  onDenied?: (error: Error) => void
  onStart?: (stream: MediaStream) => void
  onStop?: (blob: Blob) => void
  onError?: (error: Error) => void
  children: (props: IChildrenProps) => React.ReactNode
}

export interface IState {
  asked: boolean
  permission: boolean
  available: boolean
  recording: boolean
  mimeType?: string
}

export interface IChildrenProps {
  state: IState
  setup: () => void
  start: () => void
  stop: () => void
  teardown: () => void
}

export class MediaCapture extends Component<IProps, IState> {
  static defaultProps = {
    constraints: {
      audio: true,
      video: true
    },
    timeSlice: 0,
    mimeType: '',
    onGranted: identity,
    onDenied: identity,
    onStart: identity,
    onStop: identity,
    onError: identity
  }

  state = {
    asked: false,
    permission: false,
    available: false,
    recording: false,
    mimeType: null
  }

  stream = null
  mediaRecorder = null
  mediaChunk = []

  componentWillUnmount() {
    this.teardown()
  }

  teardown = () => {
    this.mediaRecorder = null
    this.mediaChunk = []

    this.stream.stop()
    this.stream = null
  }

  setup = () => {
    const { constraints } = this.props

    const handleSuccess = (stream) => {
      this.stream = stream
      this.mediaChunk = []

      this.setState({
        permission: true,
        asked: true,
        recording: false
      })
      this.props.onGranted(stream)

      this.initMediaRecorder()
    }

    const handleFailed = (error) => {
      this.setState({ asked: false })
      this.props.onDenied(error)
    }

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleFailed)
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(constraints, handleSuccess, handleFailed)
    } else {
      const errMessage = `Browser doesn't support UserMedia API. Please try with another browser.`
      console.warn(errMessage)

      this.props.onError(new Error(errMessage))
    }
  }

  initMediaRecorder = () => {
    try {
      const options: { mimeType?: string } = {}
      const types = ['video/webm;codecs=vp8', 'video/webm', '']

      if (this.props.mimeType) {
        types.unshift(this.props.mimeType)
      }

      for (const type of types) {
        if (window.MediaRecorder.isTypeSupported(type)) {
          options.mimeType = type
          break
        }

        console.warn(`${type} is not supported on your browser.`)
      }

      this.setState({ mimeType: options.mimeType })

      const mediaRecorder = new window.MediaRecorder(this.stream, options)

      mediaRecorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) {
          this.mediaChunk.push(ev.data)
        }
      }

      this.mediaRecorder = mediaRecorder

      this.setState({
        available: true
      })
    } catch (err) {
      console.log(err)
      console.error('Failed to initialize MediaRecorder.', err)

      this.setState({
        available: false
      })
    }
  }

  start = () => {
    if (!this.state.available) {
      return
    }

    this.mediaChunk = []
    this.mediaRecorder.start(this.props.timeSlice)

    this.setState({
      recording: true
    })

    this.props.onStart(this.stream)
  }

  stop = () => {
    const { available, mimeType } = this.state

    if (!available) {
      return
    }

    this.mediaRecorder.stop()

    this.setState({
      recording: false
    })

    const blob = new Blob(this.mediaChunk, { type: mimeType })
    this.props.onStop(blob)
  }

  render() {
    return this.props.children({
      state: this.state,
      setup: this.setup,
      start: this.start,
      stop: this.stop,
      teardown: this.teardown
    })
  }
}

export default MediaCapture
