import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyCandidateMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.CandidateCreateInput], required: true }) }))

export const createManyCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Candidate'],
    nullable: false,
    args: createManyCandidateMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.candidate.create({ data }))),
  }),
);

export const createManyCandidateMutation = defineMutation((t) => ({
  createManyCandidate: t.prismaField(createManyCandidateMutationObject(t)),
}));
