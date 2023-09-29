import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyAccountMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AccountWhereInput, required: true }) }))

export const deleteManyAccountMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyAccountMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.account.deleteMany({ where: args.where }),
  }),
);

export const deleteManyAccountMutation = defineMutation((t) => ({
  deleteManyAccount: t.field(deleteManyAccountMutationObject(t)),
}));
