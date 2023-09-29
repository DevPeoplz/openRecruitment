import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countOfferQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferScalarFieldEnum], required: false }),
}))

export const countOfferQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countOfferQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.offer.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countOfferQuery = defineQuery((t) => ({
  countOffer: t.field(countOfferQueryObject(t)),
}));
