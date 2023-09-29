import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const AccountObject = definePrismaObject('Account', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(AccountIdFieldObject),
    userId: t.field(AccountUserIdFieldObject),
    type: t.field(AccountTypeFieldObject),
    provider: t.field(AccountProviderFieldObject),
    providerAccountId: t.field(AccountProviderAccountIdFieldObject),
    refresh_token: t.field(AccountRefresh_tokenFieldObject),
    access_token: t.field(AccountAccess_tokenFieldObject),
    expires_at: t.field(AccountExpires_atFieldObject),
    token_type: t.field(AccountToken_typeFieldObject),
    scope: t.field(AccountScopeFieldObject),
    id_token: t.field(AccountId_tokenFieldObject),
    session_state: t.field(AccountSession_stateFieldObject),
    user: t.relation('user', AccountUserFieldObject),
  }),
});

export const AccountIdFieldObject = defineFieldObject('Account', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const AccountUserIdFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.userId,
});

export const AccountTypeFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const AccountProviderFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.provider,
});

export const AccountProviderAccountIdFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.providerAccountId,
});

export const AccountRefresh_tokenFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.refresh_token,
});

export const AccountAccess_tokenFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.access_token,
});

export const AccountExpires_atFieldObject = defineFieldObject('Account', {
  type: "Int",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.expires_at,
});

export const AccountToken_typeFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.token_type,
});

export const AccountScopeFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.scope,
});

export const AccountId_tokenFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.id_token,
});

export const AccountSession_stateFieldObject = defineFieldObject('Account', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.session_state,
});

export const AccountUserFieldObject = defineRelationObject('Account', 'user', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});
