import React, { Component } from 'react'

import { hoistStatics } from '~/lib'
import { Layout } from '~/ui'

export const withLayoutHoc = (W) => {
  class WithLayout extends Component {
    public render() {
      return (
        <Layout>
          <W {...this.props} />
        </Layout>
      )
    }
  }

  return WithLayout
}

export const withLayout = hoistStatics(withLayoutHoc)
