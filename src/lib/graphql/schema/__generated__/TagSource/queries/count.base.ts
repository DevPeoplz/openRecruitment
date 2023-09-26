import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countTagSourceQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TagSourceWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TagSourceOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TagSourceWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TagSourceScalarFieldEnum], required: false }),
}))

export const countTagSourceQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countTagSourceQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.tagSource.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countTagSourceQuery = defineQuery((t) => ({
  countTagSource: t.field(countTagSourceQueryObject(t)),
}));
