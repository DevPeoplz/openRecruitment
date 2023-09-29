import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyCandidateMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CandidateWhereInput, required: true }) }))

export const deleteManyCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyCandidateMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.candidate.deleteMany({ where: args.where }),
  }),
);

export const deleteManyCandidateMutation = defineMutation((t) => ({
  deleteManyCandidate: t.field(deleteManyCandidateMutationObject(t)),
}));
