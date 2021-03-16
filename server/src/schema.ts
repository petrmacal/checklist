import { makeExecutableSchema } from 'apollo-server'

import { TypeDefs } from './defs'
import { Resolvers } from './resolver'

export const schema = makeExecutableSchema({
  typeDefs: TypeDefs,
  resolvers: Resolvers
})
