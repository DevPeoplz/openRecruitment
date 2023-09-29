import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueEventScheduleQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventScheduleWhereUniqueInput, required: true }) }))

export const findUniqueEventScheduleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventSchedule',
    nullable: true,
    args: findUniqueEventScheduleQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventSchedule.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueEventScheduleQuery = defineQuery((t) => ({
  findUniqueEventSchedule: t.prismaField(findUniqueEventScheduleQueryObject(t)),
}));
