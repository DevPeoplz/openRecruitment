import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const TagSourceObject = definePrismaObject('TagSource', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', TagSourceIdFieldObject),
    name: t.exposeString('name', TagSourceNameFieldObject),
    type: t.exposeString('type', TagSourceTypeFieldObject),
    company: t.relation('company', TagSourceCompanyFieldObject),
    companyId: t.exposeString('companyId', TagSourceCompanyIdFieldObject),
    offerTags: t.relation('offerTags', TagSourceOfferTagsFieldObject(t)),
    candidateReferrer: t.relation(
      'candidateReferrer',
      TagSourceCandidateReferrerFieldObject
    ),
    candidateTags: t.relation(
      'candidateTags',
      TagSourceCandidateTagsFieldObject(t)
    ),
  }),
})

export const TagSourceIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const TagSourceNameFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TagSourceTypeFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TagSourceCompanyFieldObject = defineRelationObject(
  'TagSource',
  'company',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const TagSourceCompanyIdFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: false,
})

export const TagSourceOfferTagsFieldObject = defineRelationFunction(
  'TagSource',
  (t) =>
    defineRelationObject('TagSource', 'offerTags', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.OfferTagWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.OfferTagOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.OfferTagWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.OfferTagScalarFieldEnum],
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

export const TagSourceCandidateReferrerFieldObject = defineRelationObject(
  'TagSource',
  'candidateReferrer',
  {
    description: undefined,
    nullable: true,
    args: undefined,
    query: undefined,
  }
)

export const TagSourceCandidateTagsFieldObject = defineRelationFunction(
  'TagSource',
  (t) =>
    defineRelationObject('TagSource', 'candidateTags', {
      description: undefined,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.CandidateTagWhereInput, required: false }),
        orderBy: t.arg({
          type: [Inputs.CandidateTagOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.CandidateTagWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.CandidateTagScalarFieldEnum],
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
