import React, { Component } from 'react'
import { Button } from 'smooth-ui'

import styled from 'src/styled-components'

import { callAll } from 'src/lib'
import { Icon } from 'src/ui'

import { MediaCapture } from './media-capture'

export interface IState {
  granted: boolean
  rejectedReason: string
  recording: boolean
  recorded: boolean
  src: string | MediaStream | Blob
  counter?: number
}

const Root = styled.div``

const VideoRoot = styled.div``

const Video = styled.video``

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
      <Root>
        <VideoRoot>
          <Video
            src={src}
            autoPlay={!isPlayer}
            muted={!isPlayer}
            controls={isPlayer}
          />

          {counter}
        </VideoRoot>

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

            return (
              <div>
                {showSetup && (
                  <Button onClick={setup}>
                    <Icon size={20} name="record" />
                  </Button>
                )}
                {showRecord && (
                  <Button onClick={() => this.handleRecord(start)}>
                    <Icon size={20} name="record" />
                  </Button>
                )}
                {showStop && (
                  <Button onClick={callAll(stop, teardown)}>
                    <Icon size={20} name="stop" />
                  </Button>
                )}
              </div>
            )
          }}
        </MediaCapture>
      </Root>
    )
  }
}

export default Recorder
