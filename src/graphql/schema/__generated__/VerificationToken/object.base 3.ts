import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const VerificationTokenObject = definePrismaObject('VerificationToken', {
  description: undefined,
  findUnique: (fields) => ({ ...fields }),
  fields: (t) => ({
    identifier: t.exposeString(
      'identifier',
      VerificationTokenIdentifierFieldObject
    ),
    token: t.exposeString('token', VerificationTokenTokenFieldObject),
    expires: t.field(VerificationTokenExpiresFieldObject),
  }),
})

export const VerificationTokenIdentifierFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const VerificationTokenTokenFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const VerificationTokenExpiresFieldObject = defineFieldObject(
  'VerificationToken',
  {
    type: Inputs.DateTime,
    description: undefined,
    nullable: false,
    resolve: (parent) => parent.expires,
  }
)
