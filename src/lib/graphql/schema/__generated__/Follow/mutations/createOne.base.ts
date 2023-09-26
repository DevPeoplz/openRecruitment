import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneFollowMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.FollowCreateInput, required: true }) }))

export const createOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: false,
    args: createOneFollowMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.follow.create({ data: args.data, ...query }),
  }),
);

export const createOneFollowMutation = defineMutation((t) => ({
  createOneFollow: t.prismaField(createOneFollowMutationObject(t)),
}));
