// tslint:disable-next-line
require('dotenv').config()

import { graphqlAuthenticationConfig } from 'graphql-authentication'
import { GraphQLServer } from 'graphql-yoga'

import { resolvers, typeDefs } from './entity'
import { GraphqlAuthenticationLowAdapter } from './entity/auth/adapter'
import * as db from './services/db'
import { upload } from './services/uploader'

const { GRAPHQL_SERVER_PORT, SECRET } = process.env

const graphqlAuthentication = graphqlAuthenticationConfig({
  adapter: new GraphqlAuthenticationLowAdapter(),
  secret: SECRET
})

const context = (req) => {
  return {
    ...req,
    db,
    graphqlAuthentication,
    upload
  }
}

const server = new GraphQLServer({
  context,
  resolvers,
  typeDefs
})

const options = { port: GRAPHQL_SERVER_PORT }

server
  .start(options, () => {
    // tslint:disable-next-line no-console
    console.log(`Server is running ⚡ on localhost:${options.port}`)
  })
  .catch((error) => {
    // tslint:disable-next-line no-console
    console.error('connection Error', error)
  })
