import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countDisqualifyReasonQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.DisqualifyReasonWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.DisqualifyReasonOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.DisqualifyReasonWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.DisqualifyReasonScalarFieldEnum], required: false }),
}))

export const countDisqualifyReasonQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countDisqualifyReasonQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.disqualifyReason.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countDisqualifyReasonQuery = defineQuery((t) => ({
  countDisqualifyReason: t.field(countDisqualifyReasonQueryObject(t)),
}));
