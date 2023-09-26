import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countSubscriptionDataQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.SubscriptionDataWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.SubscriptionDataOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.SubscriptionDataWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.SubscriptionDataScalarFieldEnum], required: false }),
}))

export const countSubscriptionDataQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countSubscriptionDataQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.subscriptionData.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countSubscriptionDataQuery = defineQuery((t) => ({
  countSubscriptionData: t.field(countSubscriptionDataQueryObject(t)),
}));
