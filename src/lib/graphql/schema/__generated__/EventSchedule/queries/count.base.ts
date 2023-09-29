import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countEventScheduleQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleScalarFieldEnum], required: false }),
}))

export const countEventScheduleQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countEventScheduleQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventSchedule.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countEventScheduleQuery = defineQuery((t) => ({
  countEventSchedule: t.field(countEventScheduleQueryObject(t)),
}));
