import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueCandidateQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CandidateWhereUniqueInput, required: true }) }))

export const findUniqueCandidateQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Candidate',
    nullable: true,
    args: findUniqueCandidateQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueCandidateQuery = defineQuery((t) => ({
  findUniqueCandidate: t.prismaField(findUniqueCandidateQueryObject(t)),
}));
