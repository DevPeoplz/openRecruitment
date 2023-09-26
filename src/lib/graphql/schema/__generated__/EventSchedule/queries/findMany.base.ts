import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyEventScheduleQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleScalarFieldEnum], required: false }),
}))

export const findManyEventScheduleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['EventSchedule'],
    nullable: false,
    args: findManyEventScheduleQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventSchedule.findMany({
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

export const findManyEventScheduleQuery = defineQuery((t) => ({
  findManyEventSchedule: t.prismaField(findManyEventScheduleQueryObject(t)),
}));
