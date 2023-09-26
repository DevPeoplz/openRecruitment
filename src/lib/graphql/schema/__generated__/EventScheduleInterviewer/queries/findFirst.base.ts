import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstEventScheduleInterviewerQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleInterviewerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleInterviewerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleInterviewerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleInterviewerScalarFieldEnum], required: false }),
}))

export const findFirstEventScheduleInterviewerQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventScheduleInterviewer',
    nullable: true,
    args: findFirstEventScheduleInterviewerQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.findFirst({
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

export const findFirstEventScheduleInterviewerQuery = defineQuery((t) => ({
  findFirstEventScheduleInterviewer: t.prismaField(findFirstEventScheduleInterviewerQueryObject(t)),
}));
