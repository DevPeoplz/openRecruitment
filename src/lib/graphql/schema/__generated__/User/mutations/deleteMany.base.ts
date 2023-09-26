import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyUserMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserWhereInput, required: true }) }))

export const deleteManyUserMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyUserMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.user.deleteMany({ where: args.where }),
  }),
);

export const deleteManyUserMutation = defineMutation((t) => ({
  deleteManyUser: t.field(deleteManyUserMutationObject(t)),
}));
