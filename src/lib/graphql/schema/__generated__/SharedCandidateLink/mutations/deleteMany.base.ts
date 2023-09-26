import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManySharedCandidateLinkMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.SharedCandidateLinkWhereInput, required: true }) }))

export const deleteManySharedCandidateLinkMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManySharedCandidateLinkMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.sharedCandidateLink.deleteMany({ where: args.where }),
  }),
);

export const deleteManySharedCandidateLinkMutation = defineMutation((t) => ({
  deleteManySharedCandidateLink: t.field(deleteManySharedCandidateLinkMutationObject(t)),
}));
