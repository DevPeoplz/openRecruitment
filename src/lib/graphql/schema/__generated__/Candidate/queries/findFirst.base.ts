import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstCandidateQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateScalarFieldEnum], required: false }),
}))

export const findFirstCandidateQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Candidate',
    nullable: true,
    args: findFirstCandidateQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.findFirst({
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

export const findFirstCandidateQuery = defineQuery((t) => ({
  findFirstCandidate: t.prismaField(findFirstCandidateQueryObject(t)),
}));
