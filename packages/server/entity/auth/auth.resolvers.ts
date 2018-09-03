import { authMutations, authQueries } from 'graphql-authentication'

// TODO: use custom errors
const resolvers = {
  Mutation: {
    login: authMutations.login,
    signup: authMutations.signup
  },
  Query: {
    currentUser: authQueries.currentUser
  }
}

export default resolvers
