import Auth from '@aws-amplify/auth'
import { InMemoryCache } from 'apollo-boost'
import AWSAppSyncClient from 'aws-appsync'
// tslint:disable-next-line
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'
import fetch from 'node-fetch'

import AppSyncConfig from '../../AppSync'

let apolloClient = null

const isServer = !process.browser

// Polyfill fetch() on the server (used by apollo-client)
if (isServer) {
  global.fetch = fetch
}

function create(initialState) {
  const client = new AWSAppSyncClient(
    {
      auth: {
        jwtToken: async () => {
          const session = await Auth.currentSession()

          return session.getIdToken().getJwtToken()
        },
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS
      },
      disableOffline: true,
      region: AppSyncConfig.region,
      url: AppSyncConfig.graphqlEndpoint
    },
    {
      cache: new InMemoryCache().restore(initialState || {}),
      ssrMode: true
    }
  )

  return client
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
