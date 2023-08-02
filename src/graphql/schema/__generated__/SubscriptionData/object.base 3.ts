import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const SubscriptionDataObject = definePrismaObject('SubscriptionData', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', SubscriptionDataIdFieldObject),
    active: t.exposeBoolean('active', SubscriptionDataActiveFieldObject),
    currentPeriodStart: t.field(SubscriptionDataCurrentPeriodStartFieldObject),
    currentPeriodEnd: t.field(SubscriptionDataCurrentPeriodEndFieldObject),
    status: t.exposeString('status', SubscriptionDataStatusFieldObject),
    company: t.relation('company', SubscriptionDataCompanyFieldObject),
    companyId: t.exposeString(
      'companyId',
      SubscriptionDataCompanyIdFieldObject
    ),
  }),
})

export const SubscriptionDataIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const SubscriptionDataActiveFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: false,
})

export const SubscriptionDataCurrentPeriodStartFieldObject = defineFieldObject(
  'SubscriptionData',
  {
    type: Inputs.DateTime,
    description: undefined,
    nullable: false,
    resolve: (parent) => parent.currentPeriodStart,
  }
)

export const SubscriptionDataCurrentPeriodEndFieldObject = defineFieldObject(
  'SubscriptionData',
  {
    type: Inputs.DateTime,
    description: undefined,
    nullable: false,
    resolve: (parent) => parent.currentPeriodEnd,
  }
)

export const SubscriptionDataStatusFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const SubscriptionDataCompanyFieldObject = defineRelationObject(
  'SubscriptionData',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const SubscriptionDataCompanyIdFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)
