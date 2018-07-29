import hoistStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import { getCurrentUser, redirect } from 'src/lib'

export interface IOptions {
  isPrivate: boolean
  url: string
}

export const withAuth = (
  { isPrivate, url }: IOptions = { isPrivate: true, url: '/login' }
) => (W) => {
  class WithLayout extends Component {
    static async getInitialProps(context) {
      const currentUser = await getCurrentUser(context.apolloClient)

      const accessGranted = isPrivate === !!currentUser

      if (!accessGranted) {
        redirect(context, url)
      }

      let pageProps = {}

      if (W.getInitialProps) {
        pageProps = await W.getInitialProps(context)
      }

      return { ...pageProps, currentUser }
    }

    render() {
      return <W {...this.props} />
    }
  }

  return hoistStatics(WithLayout, W)
}
