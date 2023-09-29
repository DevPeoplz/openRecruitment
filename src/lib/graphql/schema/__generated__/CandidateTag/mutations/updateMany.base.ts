import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyCandidateTagMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CandidateTagWhereInput, required: false }),
      data: t.field({ type: Inputs.CandidateTagUpdateManyMutationInput, required: true }),
    }))

export const updateManyCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyCandidateTagMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.candidateTag.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyCandidateTagMutation = defineMutation((t) => ({
  updateManyCandidateTag: t.field(updateManyCandidateTagMutationObject(t)),
}));
