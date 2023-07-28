import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueOfferFileQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'OfferFile',
    nullable: true,
    args: { where: t.arg({ type: Inputs.OfferFileWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueOfferFileQuery = defineQuery((t) => ({
  findUniqueOfferFile: t.prismaField(findUniqueOfferFileQueryObject(t)),
}));
