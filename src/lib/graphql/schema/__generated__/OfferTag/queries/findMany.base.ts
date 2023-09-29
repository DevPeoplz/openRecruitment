import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyOfferTagQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferTagWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferTagOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferTagWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferTagScalarFieldEnum], required: false }),
}))

export const findManyOfferTagQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['OfferTag'],
    nullable: false,
    args: findManyOfferTagQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.findMany({
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

export const findManyOfferTagQuery = defineQuery((t) => ({
  findManyOfferTag: t.prismaField(findManyOfferTagQueryObject(t)),
}));
