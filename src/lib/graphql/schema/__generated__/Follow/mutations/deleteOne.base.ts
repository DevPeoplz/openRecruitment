import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneFollowMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FollowWhereUniqueInput, required: true }) }))

export const deleteOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: true,
    args: deleteOneFollowMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.follow.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneFollowMutation = defineMutation((t) => ({
  deleteOneFollow: t.prismaField(deleteOneFollowMutationObject(t)),
}));
