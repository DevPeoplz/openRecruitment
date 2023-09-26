import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneCandidateMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CandidateWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.CandidateUpdateInput, required: true }),
    }))

export const updateOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: true,
    args: updateOneCandidateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneCandidateMutation = defineMutation((t) => ({
  updateOneCandidate: t.prismaField(updateOneCandidateMutationObject(t)),
}));
