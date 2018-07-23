import { ApolloClient, gql, InMemoryCache } from 'apollo-boost'
import { ApolloQueryResult } from 'apollo-client'

import { getUser } from '../API'

const query = gql`
  query getUser {
    user {
      id
      name
    }
  }
`

export const getCurrentUser = (apolloClient: ApolloClient<InMemoryCache>) => {
  return apolloClient
    .query({ query })
    .then(({ data }: ApolloQueryResult<getUser>) => {
      return data.user
    })
    .catch(() => {
      // Fail gracefully
      return null
    })
}
