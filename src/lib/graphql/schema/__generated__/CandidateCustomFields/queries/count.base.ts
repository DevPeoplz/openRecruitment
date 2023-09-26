import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countCandidateCustomFieldsQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateCustomFieldsWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateCustomFieldsOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateCustomFieldsWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateCustomFieldsScalarFieldEnum], required: false }),
}))

export const countCandidateCustomFieldsQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countCandidateCustomFieldsQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.candidateCustomFields.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countCandidateCustomFieldsQuery = defineQuery((t) => ({
  countCandidateCustomFields: t.field(countCandidateCustomFieldsQueryObject(t)),
}));
