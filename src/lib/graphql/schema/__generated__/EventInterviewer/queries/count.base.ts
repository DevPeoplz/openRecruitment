import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countEventInterviewerQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventInterviewerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventInterviewerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventInterviewerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventInterviewerScalarFieldEnum], required: false }),
}))

export const countEventInterviewerQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countEventInterviewerQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventInterviewer.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countEventInterviewerQuery = defineQuery((t) => ({
  countEventInterviewer: t.field(countEventInterviewerQueryObject(t)),
}));
