import * as Inputs from '@/graphql/schema/__generated__/inputs'
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils'

export const OfferFileObject = definePrismaObject('OfferFile', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', OfferFileIdFieldObject),
    offer: t.relation('offer', OfferFileOfferFieldObject),
    offerId: t.exposeInt('offerId', OfferFileOfferIdFieldObject),
    attachment: t.relation('attachment', OfferFileAttachmentFieldObject),
    attachmentId: t.exposeInt('attachmentId', OfferFileAttachmentIdFieldObject),
  }),
})

export const OfferFileIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferFileOfferFieldObject = defineRelationObject(
  'OfferFile',
  'offer',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const OfferFileOfferIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})

export const OfferFileAttachmentFieldObject = defineRelationObject(
  'OfferFile',
  'attachment',
  {
    description: undefined,
    nullable: false,
    args: undefined,
    query: undefined,
  }
)

export const OfferFileAttachmentIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
})
