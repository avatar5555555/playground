import { ApolloClient, gql, InMemoryCache } from 'apollo-boost'
import { ApolloQueryResult } from 'apollo-client'

import { currentUser } from 'API'

export const query = gql`
  query currentUser {
    currentUser {
      id
      name
      email
    }
  }
`

export const getCurrentUser = (apolloClient: ApolloClient<InMemoryCache>) => {
  return apolloClient
    .query({ query })
    .then(({ data }: ApolloQueryResult<currentUser>) => {
      return data.currentUser
    })
    .catch(() => {
      // Fail gracefully
      return null
    })
}
