import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneCandidateMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CandidateWhereUniqueInput, required: true }) }))

export const deleteOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: true,
    args: deleteOneCandidateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneCandidateMutation = defineMutation((t) => ({
  deleteOneCandidate: t.prismaField(deleteOneCandidateMutationObject(t)),
}));
