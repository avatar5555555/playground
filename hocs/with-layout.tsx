import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import React, { Component, Fragment } from 'react'

import { hoistStatics } from '~/lib'
import { Layout } from '~/ui'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export const withLayoutHoc = (W) => {
  class WithLayout extends Component {
    public render() {
      return (
        <Fragment>
          <Head>
            <link
              rel="stylesheet"
              type="text/css"
              href="/static/nprogress.css"
            />
          </Head>
          <Layout>
            <W {...this.props} />
          </Layout>
        </Fragment>
      )
    }
  }

  return WithLayout
}

export const withLayout = hoistStatics(withLayoutHoc)
