import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const VerificationTokenObject = definePrismaObject('VerificationToken', {
  description: undefined,
  findUnique: (fields) => ({ ...fields }),
  fields: (t) => ({
    identifier: t.field(VerificationTokenIdentifierFieldObject),
    token: t.field(VerificationTokenTokenFieldObject),
    expires: t.field(VerificationTokenExpiresFieldObject),
  }),
});

export const VerificationTokenIdentifierFieldObject = defineFieldObject('VerificationToken', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.identifier,
});

export const VerificationTokenTokenFieldObject = defineFieldObject('VerificationToken', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.token,
});

export const VerificationTokenExpiresFieldObject = defineFieldObject('VerificationToken', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.expires,
});
