import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstAccountQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AccountWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AccountOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AccountWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AccountScalarFieldEnum], required: false }),
}))

export const findFirstAccountQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Account',
    nullable: true,
    args: findFirstAccountQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.account.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstAccountQuery = defineQuery((t) => ({
  findFirstAccount: t.prismaField(findFirstAccountQueryObject(t)),
}));
