import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countEventScheduleInterviewerQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleInterviewerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleInterviewerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleInterviewerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleInterviewerScalarFieldEnum], required: false }),
}))

export const countEventScheduleInterviewerQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countEventScheduleInterviewerQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countEventScheduleInterviewerQuery = defineQuery((t) => ({
  countEventScheduleInterviewer: t.field(countEventScheduleInterviewerQueryObject(t)),
}));
