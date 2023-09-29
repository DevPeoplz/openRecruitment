import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneAccountMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AccountWhereUniqueInput, required: true }) }))

export const deleteOneAccountMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Account',
    nullable: true,
    args: deleteOneAccountMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.account.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneAccountMutation = defineMutation((t) => ({
  deleteOneAccount: t.prismaField(deleteOneAccountMutationObject(t)),
}));
