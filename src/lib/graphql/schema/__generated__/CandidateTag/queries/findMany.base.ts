import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyCandidateTagQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['CandidateTag'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CandidateTagWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.CandidateTagOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.CandidateTagWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.CandidateTagScalarFieldEnum], required: false }),
    },
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
