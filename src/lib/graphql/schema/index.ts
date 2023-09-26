import { generateAllCrud } from './extended/crud'
import { builder } from './builder'

generateAllCrud()

builder.queryType({})
builder.mutationType({})

export const schema = builder.toSchema({})
