import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueOfferTagQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.OfferTagWhereUniqueInput, required: true }) }))

export const findUniqueOfferTagQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'OfferTag',
    nullable: true,
    args: findUniqueOfferTagQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueOfferTagQuery = defineQuery((t) => ({
  findUniqueOfferTag: t.prismaField(findUniqueOfferTagQueryObject(t)),
}));
