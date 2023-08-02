import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const OfferTagObject = definePrismaObject('OfferTag', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', OfferTagIdFieldObject),
    offer: t.relation('offer', OfferTagOfferFieldObject),
    offerId: t.exposeInt('offerId', OfferTagOfferIdFieldObject),
    tag: t.relation('tag', OfferTagTagFieldObject),
    tagId: t.exposeInt('tagId', OfferTagTagIdFieldObject),
  }),
})

export const OfferTagIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferTagOfferFieldObject = defineRelationObject(
  'OfferTag',
  'offer',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const OfferTagOfferIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferTagTagFieldObject = defineRelationObject('OfferTag', 'tag', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
})

export const OfferTagTagIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
