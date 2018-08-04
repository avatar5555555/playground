import React, { Component } from 'react'

import { ISvgIconProps } from './types'

export class Stop extends Component<ISvgIconProps> {
  static defaultProps = {
    width: 512,
    height: 512
  }

  render() {
    const { width, height, fill } = this.props

    return (
      <svg viewBox="0 0 232.679 232.679" width={width} height={height}>
        <path
          d="M214.781 0H17.898C8.013 0 0 8.014 0 17.898v196.883c0 9.885 8.013 17.898 17.898 17.898h196.883c9.886 0 17.898-8.013 17.898-17.898V17.898C232.679 8.014 224.666 0 214.781 0z"
          fill={fill}
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )
  }
}
