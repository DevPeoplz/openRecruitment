import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueAccountQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AccountWhereUniqueInput, required: true }) }))

export const findUniqueAccountQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Account',
    nullable: true,
    args: findUniqueAccountQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.account.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueAccountQuery = defineQuery((t) => ({
  findUniqueAccount: t.prismaField(findUniqueAccountQueryObject(t)),
}));
