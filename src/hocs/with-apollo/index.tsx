import cookie from 'cookie'
import Head from 'next/head'
import React from 'react'
import { getDataFromTree } from 'react-apollo'

import initApollo from './init-apollo'

const parseCookies = (req = null, options = {}) => {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options)
}

export const withApollo = (App) => {
  return class Apollo extends React.Component<{ apolloState: any }> {
    static displayName = 'withApollo(App)'

    static async getInitialProps(context) {
      const { Component, router, ctx } = context
      const { res, req } = ctx

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo({}, { getToken: () => parseCookies(req).token })

      ctx.apolloClient = apollo

      let appProps = {}

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(context)
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {}
      }

      const isServer = !process.browser

      if (isServer) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          // tslint:disable-next-line
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    apolloClient = initApollo(this.props.apolloState, {
      getToken: () => parseCookies().token
    })

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
