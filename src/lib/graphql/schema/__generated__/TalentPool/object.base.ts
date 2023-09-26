import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const TalentPoolObject = definePrismaObject('TalentPool', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(TalentPoolIdFieldObject),
    name: t.field(TalentPoolNameFieldObject),
    description: t.field(TalentPoolDescriptionFieldObject),
    files: t.relation('files', TalentPoolFilesFieldObject(t)),
    matches: t.relation('matches', TalentPoolMatchesFieldObject(t)),
    follows: t.relation('follows', TalentPoolFollowsFieldObject(t)),
    company: t.relation('company', TalentPoolCompanyFieldObject),
    companyId: t.field(TalentPoolCompanyIdFieldObject),
  }),
});

export const TalentPoolIdFieldObject = defineFieldObject('TalentPool', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const TalentPoolNameFieldObject = defineFieldObject('TalentPool', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const TalentPoolDescriptionFieldObject = defineFieldObject('TalentPool', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.description,
});

export const TalentPoolFilesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TalentPoolFileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TalentPoolFileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TalentPoolFileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TalentPoolFileScalarFieldEnum], required: false }),
}))

export const TalentPoolFilesFieldObject = defineRelationFunction('TalentPool', (t) =>
  defineRelationObject('TalentPool', 'files', {
    description: undefined,
    nullable: false,
    args: TalentPoolFilesFieldArgs,
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

export const TalentPoolMatchesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TalentPoolMatchWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TalentPoolMatchOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TalentPoolMatchWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TalentPoolMatchScalarFieldEnum], required: false }),
}))

export const TalentPoolMatchesFieldObject = defineRelationFunction('TalentPool', (t) =>
  defineRelationObject('TalentPool', 'matches', {
    description: undefined,
    nullable: false,
    args: TalentPoolMatchesFieldArgs,
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

export const TalentPoolFollowsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.FollowWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.FollowOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.FollowWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.FollowScalarFieldEnum], required: false }),
}))

export const TalentPoolFollowsFieldObject = defineRelationFunction('TalentPool', (t) =>
  defineRelationObject('TalentPool', 'follows', {
    description: undefined,
    nullable: false,
    args: TalentPoolFollowsFieldArgs,
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

export const TalentPoolCompanyFieldObject = defineRelationObject('TalentPool', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const TalentPoolCompanyIdFieldObject = defineFieldObject('TalentPool', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});
