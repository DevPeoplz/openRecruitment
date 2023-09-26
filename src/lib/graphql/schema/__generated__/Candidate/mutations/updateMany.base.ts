import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyCandidateMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CandidateWhereInput, required: false }),
      data: t.field({ type: Inputs.CandidateUpdateManyMutationInput, required: true }),
    }))

export const updateManyCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyCandidateMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.candidate.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyCandidateMutation = defineMutation((t) => ({
  updateManyCandidate: t.field(updateManyCandidateMutationObject(t)),
}));
