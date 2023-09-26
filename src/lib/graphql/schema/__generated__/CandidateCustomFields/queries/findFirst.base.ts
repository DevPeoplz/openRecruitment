import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstCandidateCustomFieldsQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateCustomFieldsWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateCustomFieldsOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateCustomFieldsWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateCustomFieldsScalarFieldEnum], required: false }),
}))

export const findFirstCandidateCustomFieldsQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'CandidateCustomFields',
    nullable: true,
    args: findFirstCandidateCustomFieldsQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateCustomFields.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstCandidateCustomFieldsQuery = defineQuery((t) => ({
  findFirstCandidateCustomFields: t.prismaField(findFirstCandidateCustomFieldsQueryObject(t)),
}));
