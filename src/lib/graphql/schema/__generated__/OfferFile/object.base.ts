import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const OfferFileObject = definePrismaObject('OfferFile', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(OfferFileIdFieldObject),
    offer: t.relation('offer', OfferFileOfferFieldObject),
    offerId: t.field(OfferFileOfferIdFieldObject),
    attachment: t.relation('attachment', OfferFileAttachmentFieldObject),
    attachmentId: t.field(OfferFileAttachmentIdFieldObject),
  }),
});

export const OfferFileIdFieldObject = defineFieldObject('OfferFile', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const OfferFileOfferFieldObject = defineRelationObject('OfferFile', 'offer', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const OfferFileOfferIdFieldObject = defineFieldObject('OfferFile', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.offerId,
});

export const OfferFileAttachmentFieldObject = defineRelationObject('OfferFile', 'attachment', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const OfferFileAttachmentIdFieldObject = defineFieldObject('OfferFile', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.attachmentId,
});
