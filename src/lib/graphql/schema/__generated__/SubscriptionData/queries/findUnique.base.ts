import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueSubscriptionDataQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.SubscriptionDataWhereUniqueInput, required: true }) }))

export const findUniqueSubscriptionDataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'SubscriptionData',
    nullable: true,
    args: findUniqueSubscriptionDataQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.subscriptionData.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueSubscriptionDataQuery = defineQuery((t) => ({
  findUniqueSubscriptionData: t.prismaField(findUniqueSubscriptionDataQueryObject(t)),
}));
