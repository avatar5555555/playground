import { authMutations, authQueries } from 'graphql-authentication'

const resolvers = {
  Mutation: {
    ...authMutations
  },
  Query: {
    ...authQueries
  }
}

export default resolvers
