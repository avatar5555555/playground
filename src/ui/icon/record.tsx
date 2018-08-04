import React, { Component } from 'react'

import { ISvgIconProps } from './types'

export class Record extends Component<ISvgIconProps> {
  static defaultProps = {
    width: 512,
    height: 512
  }

  render() {
    const { width, height, fill } = this.props

    return (
      <svg viewBox="0 0 232.68 232.68" width={width} height={height}>
        <circle
          cx={116.341}
          cy={116.34}
          r={116.34}
          fill={fill}
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
}
