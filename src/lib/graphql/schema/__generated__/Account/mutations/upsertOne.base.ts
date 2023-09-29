import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneAccountMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AccountWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.AccountCreateInput, required: true }),
      update: t.field({ type: Inputs.AccountUpdateInput, required: true }),
    }))

export const upsertOneAccountMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Account',
    nullable: false,
    args: upsertOneAccountMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.account.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneAccountMutation = defineMutation((t) => ({
  upsertOneAccount: t.prismaField(upsertOneAccountMutationObject(t)),
}));
