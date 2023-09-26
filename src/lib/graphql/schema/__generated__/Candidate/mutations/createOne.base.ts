import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneCandidateMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.CandidateCreateInput, required: true }) }))

export const createOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: false,
    args: createOneCandidateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.create({ data: args.data, ...query }),
  }),
);

export const createOneCandidateMutation = defineMutation((t) => ({
  createOneCandidate: t.prismaField(createOneCandidateMutationObject(t)),
}));
