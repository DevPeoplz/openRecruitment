import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countEventScheduleEvaluationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleEvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleEvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleEvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleEvaluationScalarFieldEnum], required: false }),
}))

export const countEventScheduleEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countEventScheduleEvaluationQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventScheduleEvaluation.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countEventScheduleEvaluationQuery = defineQuery((t) => ({
  countEventScheduleEvaluation: t.field(countEventScheduleEvaluationQueryObject(t)),
}));
