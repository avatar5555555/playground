import React, { Component } from 'react'
import { Base, Button } from 'reakit'

import { page } from '~/hocs'

class Index extends Component {
  public render() {
    return (
      <Base>
        <Button>Hello world</Button>
      </Base>
    )
  }
}

export default page(Index)
