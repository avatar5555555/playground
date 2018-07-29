import React, { Component, Fragment } from 'react'
import { callAll } from 'src/lib'

import { MediaCapture } from './media-capture'

export interface IState {
  granted: boolean
  rejectedReason: string
  recording: boolean
  recorded: boolean
  src: string | MediaStream | Blob
  counter?: number
}

// TODO: use state machine
export class Recorder extends Component {
  state = {
    granted: false,
    rejectedReason: '',
    recording: false,
    recorded: false,
    src: '',
    counter: null
  }

  timeout: any

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  handleGranted = (stream: MediaStream) => {
    this.setState({ granted: true })
    this.setVideo(stream)
  }

  handleDenied = (error: Error) => {
    this.setState({ rejectedReason: error.name })
  }

  handleStart = (stream: MediaStream) => {
    this.setState({ recording: true })
    this.setVideo(stream)
  }

  handleStop = (blob: Blob) => {
    this.setState({ recording: false, recorded: true })
    this.setVideo(blob)
  }

  handleError = (error: Error) => {
    // tslint:disable-next-line no-console
    console.error(error)
  }

  setVideo = (input: Blob | MediaStream) => {
    this.setState({ src: URL.createObjectURL(input) })
  }

  releaseVideo = () => {
    this.setState({ src: '' })
  }

  countDown = (start: () => void) => {
    const { counter } = this.state

    if (counter <= 1) {
      this.setState({ counter: null })

      return start()
    }

    const cb = () => {
      this.timeout = setTimeout(this.countDown, 1000, start)
    }

    this.setState((state: IState) => ({ counter: state.counter - 1 }), cb)
  }

  handleRecord = (start: () => void) => {
    this.setState({ counter: 3 })
    this.timeout = setTimeout(this.countDown, 1000, start)
  }

  render() {
    const { granted, recording, src, recorded, counter } = this.state
    const isPlayer = !recording && recorded && counter === null

    return (
      <Fragment>
        <video
          src={src}
          autoPlay={!isPlayer}
          muted={!isPlayer}
          controls={isPlayer}
        />

        {counter}

        <MediaCapture
          constraints={{ audio: true, video: true }}
          timeSlice={10}
          onGranted={this.handleGranted}
          onDenied={this.handleDenied}
          onStart={this.handleStart}
          onStop={this.handleStop}
          onError={this.handleError}
        >
          {({ start, stop, setup, teardown }) => {
            const showSetup = !granted
            const showRecord = !recording && granted && counter === null
            const showStop = recording
            const recordText = recorded ? 'rerecord' : 'record'

            return (
              <div>
                {showSetup && <button onClick={setup}>Setup</button>}
                {showRecord && (
                  <button onClick={() => this.handleRecord(start)}>
                    {recordText}
                  </button>
                )}
                {showStop && (
                  <button onClick={callAll(stop, teardown)}>Stop</button>
                )}
              </div>
            )
          }}
        </MediaCapture>
      </Fragment>
    )
  }
}

export default Recorder
