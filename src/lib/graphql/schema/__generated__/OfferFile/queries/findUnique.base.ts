import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueOfferFileQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.OfferFileWhereUniqueInput, required: true }) }))

export const findUniqueOfferFileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'OfferFile',
    nullable: true,
    args: findUniqueOfferFileQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueOfferFileQuery = defineQuery((t) => ({
  findUniqueOfferFile: t.prismaField(findUniqueOfferFileQueryObject(t)),
}));
