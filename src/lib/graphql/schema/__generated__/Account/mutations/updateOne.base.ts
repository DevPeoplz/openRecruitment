import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneAccountMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AccountWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.AccountUpdateInput, required: true }),
    }))

export const updateOneAccountMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Account',
    nullable: true,
    args: updateOneAccountMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.account.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneAccountMutation = defineMutation((t) => ({
  updateOneAccount: t.prismaField(updateOneAccountMutationObject(t)),
}));
