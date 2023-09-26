import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyAccountMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AccountWhereInput, required: false }),
      data: t.field({ type: Inputs.AccountUpdateManyMutationInput, required: true }),
    }))

export const updateManyAccountMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyAccountMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.account.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyAccountMutation = defineMutation((t) => ({
  updateManyAccount: t.field(updateManyAccountMutationObject(t)),
}));
