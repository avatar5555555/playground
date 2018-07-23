import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import getConfig from 'next/config'
import fetch from 'node-fetch'

const { publicRuntimeConfig } = getConfig()

let apolloClient = null

const isServer = !process.browser

// Polyfill fetch() on the server (used by apollo-client)
if (isServer) {
  global.fetch = fetch
}

function create(initialState, { getToken }) {
  const httpLink = createHttpLink({
    credentials: 'same-origin',
    uri: publicRuntimeConfig.GRAPHQL_API_URL
  })

  const authLink = setContext((_, { headers }) => {
    const token = getToken()

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: process.browser,
    link: authLink.concat(httpLink),
    ssrMode: !process.browser // Disables forceFetch on the server (so queries are only run once)
  })
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
