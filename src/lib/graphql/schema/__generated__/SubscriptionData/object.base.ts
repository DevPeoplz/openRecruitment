import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const SubscriptionDataObject = definePrismaObject('SubscriptionData', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(SubscriptionDataIdFieldObject),
    active: t.field(SubscriptionDataActiveFieldObject),
    currentPeriodStart: t.field(SubscriptionDataCurrentPeriodStartFieldObject),
    currentPeriodEnd: t.field(SubscriptionDataCurrentPeriodEndFieldObject),
    status: t.field(SubscriptionDataStatusFieldObject),
    company: t.relation('company', SubscriptionDataCompanyFieldObject),
    companyId: t.field(SubscriptionDataCompanyIdFieldObject),
  }),
});

export const SubscriptionDataIdFieldObject = defineFieldObject('SubscriptionData', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const SubscriptionDataActiveFieldObject = defineFieldObject('SubscriptionData', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.active,
});

export const SubscriptionDataCurrentPeriodStartFieldObject = defineFieldObject('SubscriptionData', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.currentPeriodStart,
});

export const SubscriptionDataCurrentPeriodEndFieldObject = defineFieldObject('SubscriptionData', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.currentPeriodEnd,
});

export const SubscriptionDataStatusFieldObject = defineFieldObject('SubscriptionData', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.status,
});

export const SubscriptionDataCompanyFieldObject = defineRelationObject('SubscriptionData', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const SubscriptionDataCompanyIdFieldObject = defineFieldObject('SubscriptionData', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});
