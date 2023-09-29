import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyAccountMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.AccountCreateInput], required: true }) }))

export const createManyAccountMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Account'],
    nullable: false,
    args: createManyAccountMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.account.create({ data }))),
  }),
);

export const createManyAccountMutation = defineMutation((t) => ({
  createManyAccount: t.prismaField(createManyAccountMutationObject(t)),
}));
