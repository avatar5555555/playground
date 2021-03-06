import { defaultTo } from 'ramda'
import React, { Component } from 'react'
import styled, { WithOptionalTheme, withTheme } from 'src/styled-components'

import { Theme } from 'src/ui'

import { Record } from './record'
import { Stop } from './stop'
import { Color, Size } from './types'

const Icons = {
  record: Record,
  stop: Stop
}

type Name = keyof typeof Icons

export interface IIconProps {
  name: Name
  size?: Size
  width?: Size
  height?: Size
  fill?: Color
  theme: Theme
}

class IconView extends Component<IIconProps> {
  render() {
    const { name, size, width, height, fill, theme } = this.props

    const IconComponent = Icons[name]

    const iconWidth = defaultTo(width, size)
    const iconHeight = defaultTo(height, size)
    const iconFill = defaultTo(fill, theme[fill])

    return (
      <IconComponent width={iconWidth} height={iconHeight} fill={iconFill} />
    )
  }
}

const IconWithTheme = withTheme(IconView)

export const Icon = styled<WithOptionalTheme<IIconProps>>(IconWithTheme)``
