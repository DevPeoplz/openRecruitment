import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstEventScheduleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventSchedule',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.EventScheduleWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.EventScheduleOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.EventScheduleWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.EventScheduleScalarFieldEnum], required: false }),
    },
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
