import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const DisqualifyReasonObject = definePrismaObject('DisqualifyReason', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', DisqualifyReasonIdFieldObject),
    name: t.exposeString('name', DisqualifyReasonNameFieldObject),
    action: t.field(DisqualifyReasonActionFieldObject),
    company: t.relation('company', DisqualifyReasonCompanyFieldObject),
    companyId: t.exposeString(
      'companyId',
      DisqualifyReasonCompanyIdFieldObject
    ),
    matches: t.relation('matches', DisqualifyReasonMatchesFieldObject(t)),
  }),
})

export const DisqualifyReasonIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const DisqualifyReasonNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const DisqualifyReasonActionFieldObject = defineFieldObject(
  'DisqualifyReason',
  {
    type: Inputs.Json,
    description: undefined,
    nullable: false,
    resolve: (parent) => parent.action,
  }
)

export const DisqualifyReasonCompanyFieldObject = defineRelationObject(
  'DisqualifyReason',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const DisqualifyReasonCompanyIdFieldObject = defineExposeObject(
  'String',
  {
    description: undefined,
    nullable: false,
  }
)

export const DisqualifyReasonMatchesFieldObject = defineRelationFunction(
  'DisqualifyReason',
  (t) =>
    defineRelationObject('DisqualifyReason', 'matches', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.MatchWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.MatchOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({ type: Inputs.MatchWhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.MatchScalarFieldEnum],
          required: false,
        }),
      },
      query: (args) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
    })
)
