import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const StageObject = definePrismaObject('Stage', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(StageIdFieldObject),
    position: t.field(StagePositionFieldObject),
    category: t.field(StageCategoryFieldObject),
    inputType: t.field(StageInputTypeFieldObject),
    value: t.field(StageValueFieldObject),
    template: t.relation('template', StageTemplateFieldObject),
    templateId: t.field(StageTemplateIdFieldObject),
    isProtected: t.field(StageIsProtectedFieldObject),
    matches: t.relation('matches', StageMatchesFieldObject(t)),
    visibility: t.relation('visibility', StageVisibilityFieldObject(t)),
    metadata: t.relation('metadata', StageMetadataFieldObject(t)),
  }),
});

export const StageIdFieldObject = defineFieldObject('Stage', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const StagePositionFieldObject = defineFieldObject('Stage', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.position,
});

export const StageCategoryFieldObject = defineFieldObject('Stage', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.category,
});

export const StageInputTypeFieldObject = defineFieldObject('Stage', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.inputType,
});

export const StageValueFieldObject = defineFieldObject('Stage', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.value,
});

export const StageTemplateFieldObject = defineRelationObject('Stage', 'template', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const StageTemplateIdFieldObject = defineFieldObject('Stage', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.templateId,
});

export const StageIsProtectedFieldObject = defineFieldObject('Stage', {
  type: "Boolean",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.isProtected,
});

export const StageMatchesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MatchWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MatchOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MatchWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MatchScalarFieldEnum], required: false }),
}))

export const StageMatchesFieldObject = defineRelationFunction('Stage', (t) =>
  defineRelationObject('Stage', 'matches', {
    description: undefined,
    nullable: false,
    args: StageMatchesFieldArgs,
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

export const StageVisibilityFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageVisibilityWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageVisibilityOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageVisibilityWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageVisibilityScalarFieldEnum], required: false }),
}))

export const StageVisibilityFieldObject = defineRelationFunction('Stage', (t) =>
  defineRelationObject('Stage', 'visibility', {
    description: undefined,
    nullable: false,
    args: StageVisibilityFieldArgs,
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

export const StageMetadataFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageMetadataWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageMetadataOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageMetadataWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageMetadataScalarFieldEnum], required: false }),
}))

export const StageMetadataFieldObject = defineRelationFunction('Stage', (t) =>
  defineRelationObject('Stage', 'metadata', {
    description: undefined,
    nullable: false,
    args: StageMetadataFieldArgs,
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
