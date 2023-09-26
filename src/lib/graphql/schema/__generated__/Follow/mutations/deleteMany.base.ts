import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyFollowMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FollowWhereInput, required: true }) }))

export const deleteManyFollowMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyFollowMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.follow.deleteMany({ where: args.where }),
  }),
);

export const deleteManyFollowMutation = defineMutation((t) => ({
  deleteManyFollow: t.field(deleteManyFollowMutationObject(t)),
}));
