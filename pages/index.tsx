import React, { Component } from 'react'
import { Typography } from 'smooth-ui'

import { page } from '~/hocs'

class Index extends Component {
  public render() {
    return <Typography variant="h1">Hello world</Typography>
  }
}

export default page(Index)
