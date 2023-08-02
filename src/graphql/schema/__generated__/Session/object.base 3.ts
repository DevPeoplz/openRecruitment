import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const SessionObject = definePrismaObject('Session', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', SessionIdFieldObject),
    sessionToken: t.exposeString(
      'sessionToken',
      SessionSessionTokenFieldObject
    ),
    userId: t.exposeString('userId', SessionUserIdFieldObject),
    expires: t.field(SessionExpiresFieldObject),
    user: t.relation('user', SessionUserFieldObject),
  }),
})

export const SessionIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const SessionSessionTokenFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const SessionUserIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const SessionExpiresFieldObject = defineFieldObject('Session', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.expires,
})

export const SessionUserFieldObject = defineRelationObject('Session', 'user', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
})
