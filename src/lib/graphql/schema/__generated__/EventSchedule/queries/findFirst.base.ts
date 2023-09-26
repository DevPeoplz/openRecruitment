import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstEventScheduleQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleScalarFieldEnum], required: false }),
}))

export const findFirstEventScheduleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventSchedule',
    nullable: true,
    args: findFirstEventScheduleQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventSchedule.findFirst({
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

export const findFirstEventScheduleQuery = defineQuery((t) => ({
  findFirstEventSchedule: t.prismaField(findFirstEventScheduleQueryObject(t)),
}));
