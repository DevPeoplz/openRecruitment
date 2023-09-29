import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueEventScheduleInterviewerQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventScheduleInterviewerWhereUniqueInput, required: true }) }))

export const findUniqueEventScheduleInterviewerQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventScheduleInterviewer',
    nullable: true,
    args: findUniqueEventScheduleInterviewerQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueEventScheduleInterviewerQuery = defineQuery((t) => ({
  findUniqueEventScheduleInterviewer: t.prismaField(findUniqueEventScheduleInterviewerQueryObject(t)),
}));
