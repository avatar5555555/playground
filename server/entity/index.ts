import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import * as path from 'path'

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'))

export const typeDefs = mergeTypes(typesArray)

const resolversArray = fileLoader(path.join(__dirname, './**/*.resolvers.*'))

export const resolvers = mergeResolvers(resolversArray)
