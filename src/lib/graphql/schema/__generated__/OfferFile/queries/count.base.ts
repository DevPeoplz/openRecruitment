import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countOfferFileQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.OfferFileWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.OfferFileOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.OfferFileWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.OfferFileScalarFieldEnum], required: false }),
}))

export const countOfferFileQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countOfferFileQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.offerFile.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countOfferFileQuery = defineQuery((t) => ({
  countOfferFile: t.field(countOfferFileQueryObject(t)),
}));
