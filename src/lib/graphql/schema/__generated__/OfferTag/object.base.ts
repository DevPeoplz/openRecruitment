import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const OfferTagObject = definePrismaObject('OfferTag', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(OfferTagIdFieldObject),
    offer: t.relation('offer', OfferTagOfferFieldObject),
    offerId: t.field(OfferTagOfferIdFieldObject),
    tag: t.relation('tag', OfferTagTagFieldObject),
    tagId: t.field(OfferTagTagIdFieldObject),
  }),
});

export const OfferTagIdFieldObject = defineFieldObject('OfferTag', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const OfferTagOfferFieldObject = defineRelationObject('OfferTag', 'offer', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const OfferTagOfferIdFieldObject = defineFieldObject('OfferTag', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.offerId,
});

export const OfferTagTagFieldObject = defineRelationObject('OfferTag', 'tag', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const OfferTagTagIdFieldObject = defineFieldObject('OfferTag', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.tagId,
});
