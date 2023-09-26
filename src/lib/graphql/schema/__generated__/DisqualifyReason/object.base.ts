import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const DisqualifyReasonObject = definePrismaObject('DisqualifyReason', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(DisqualifyReasonIdFieldObject),
    name: t.field(DisqualifyReasonNameFieldObject),
    action: t.field(DisqualifyReasonActionFieldObject),
    company: t.relation('company', DisqualifyReasonCompanyFieldObject),
    companyId: t.field(DisqualifyReasonCompanyIdFieldObject),
    matches: t.relation('matches', DisqualifyReasonMatchesFieldObject(t)),
  }),
});

export const DisqualifyReasonIdFieldObject = defineFieldObject('DisqualifyReason', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const DisqualifyReasonNameFieldObject = defineFieldObject('DisqualifyReason', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
});

export const DisqualifyReasonActionFieldObject = defineFieldObject('DisqualifyReason', {
  type: Inputs.Json,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.action,
});

export const DisqualifyReasonCompanyFieldObject = defineRelationObject('DisqualifyReason', 'company', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const DisqualifyReasonCompanyIdFieldObject = defineFieldObject('DisqualifyReason', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.companyId,
});

export const DisqualifyReasonMatchesFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MatchWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MatchOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MatchWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MatchScalarFieldEnum], required: false }),
}))

export const DisqualifyReasonMatchesFieldObject = defineRelationFunction('DisqualifyReason', (t) =>
  defineRelationObject('DisqualifyReason', 'matches', {
    description: undefined,
    nullable: false,
    args: DisqualifyReasonMatchesFieldArgs,
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
