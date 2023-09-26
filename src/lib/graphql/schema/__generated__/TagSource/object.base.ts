import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const TagSourceObject = definePrismaObject('TagSource', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(TagSourceIdFieldObject),
    name: t.field(TagSourceNameFieldObject),
    type: t.field(TagSourceTypeFieldObject),
    company: t.relation('company', TagSourceCompanyFieldObject),
    companyId: t.field(TagSourceCompanyIdFieldObject),
    offerTags: t.relation('offerTags', TagSourceOfferTagsFieldObject(t)),
    candidateReferrer: t.relation('candidateReferrer', TagSourceCandidateReferrerFieldObject(t)),
    candidateTags: t.relation('candidateTags', TagSourceCandidateTagsFieldObject(t)),
  }),
});

export const TagSourceIdFieldObject = defineFieldObject('TagSource', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const TagSourceNameFieldObject = defineFieldObject('TagSource', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const TagSourceTypeFieldObject = defineFieldObject('TagSource', {
  type: Inputs.TagSourceType,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const TagSourceCompanyFieldObject = defineRelationObject('TagSource', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const TagSourceCompanyIdFieldObject = defineFieldObject('TagSource', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const TagSourceOfferTagsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferTagWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferTagOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferTagWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferTagScalarFieldEnum], required: false }),
}))

export const TagSourceOfferTagsFieldObject = defineRelationFunction('TagSource', (t) =>
  defineRelationObject('TagSource', 'offerTags', {
    description: undefined,
    nullable: false,
    args: TagSourceOfferTagsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const TagSourceCandidateReferrerFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateScalarFieldEnum], required: false }),
}))

export const TagSourceCandidateReferrerFieldObject = defineRelationFunction('TagSource', (t) =>
  defineRelationObject('TagSource', 'candidateReferrer', {
    description: undefined,
    nullable: false,
    args: TagSourceCandidateReferrerFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const TagSourceCandidateTagsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateTagWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateTagOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateTagWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateTagScalarFieldEnum], required: false }),
}))

export const TagSourceCandidateTagsFieldObject = defineRelationFunction('TagSource', (t) =>
  defineRelationObject('TagSource', 'candidateTags', {
    description: undefined,
    nullable: false,
    args: TagSourceCandidateTagsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);
