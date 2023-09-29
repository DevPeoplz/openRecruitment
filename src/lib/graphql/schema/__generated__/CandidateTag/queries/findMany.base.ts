import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyCandidateTagQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CandidateTagWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CandidateTagOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CandidateTagWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CandidateTagScalarFieldEnum], required: false }),
}))

export const findManyCandidateTagQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['CandidateTag'],
    nullable: false,
    args: findManyCandidateTagQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.findMany({
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

export const findManyCandidateTagQuery = defineQuery((t) => ({
  findManyCandidateTag: t.prismaField(findManyCandidateTagQueryObject(t)),
}));
