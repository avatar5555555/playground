import React, { Component } from 'react'
import styled from 'styled-components'

const Root = styled.div``

interface ILayoutProps {
  children: React.ReactNode
}

export class Layout extends Component<ILayoutProps> {
  public render() {
    return <Root>{this.props.children}</Root>
  }
}
