import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManySharedCandidateLinkMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.SharedCandidateLinkWhereInput, required: false }),
      data: t.field({ type: Inputs.SharedCandidateLinkUpdateManyMutationInput, required: true }),
    }))

export const updateManySharedCandidateLinkMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManySharedCandidateLinkMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.sharedCandidateLink.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManySharedCandidateLinkMutation = defineMutation((t) => ({
  updateManySharedCandidateLink: t.field(updateManySharedCandidateLinkMutationObject(t)),
}));
