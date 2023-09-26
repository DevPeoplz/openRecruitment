import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueCandidateTagQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CandidateTagWhereUniqueInput, required: true }) }))

export const findUniqueCandidateTagQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'CandidateTag',
    nullable: true,
    args: findUniqueCandidateTagQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueCandidateTagQuery = defineQuery((t) => ({
  findUniqueCandidateTag: t.prismaField(findUniqueCandidateTagQueryObject(t)),
}));
