import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstOfferQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferScalarFieldEnum], required: false }),
}))

export const findFirstOfferQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Offer',
    nullable: true,
    args: findFirstOfferQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.findFirst({
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

export const findFirstOfferQuery = defineQuery((t) => ({
  findFirstOffer: t.prismaField(findFirstOfferQueryObject(t)),
}));
