import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const SessionObject = definePrismaObject('Session', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(SessionIdFieldObject),
    sessionToken: t.field(SessionSessionTokenFieldObject),
    userId: t.field(SessionUserIdFieldObject),
    expires: t.field(SessionExpiresFieldObject),
    user: t.relation('user', SessionUserFieldObject),
  }),
});

export const SessionIdFieldObject = defineFieldObject('Session', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const SessionSessionTokenFieldObject = defineFieldObject('Session', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.sessionToken,
});

export const SessionUserIdFieldObject = defineFieldObject('Session', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.userId,
});

export const SessionExpiresFieldObject = defineFieldObject('Session', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.expires,
});

export const SessionUserFieldObject = defineRelationObject('Session', 'user', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});
