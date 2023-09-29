import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstEventScheduleEvaluationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventScheduleEvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventScheduleEvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventScheduleEvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventScheduleEvaluationScalarFieldEnum], required: false }),
}))

export const findFirstEventScheduleEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventScheduleEvaluation',
    nullable: true,
    args: findFirstEventScheduleEvaluationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleEvaluation.findFirst({
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

export const findFirstEventScheduleEvaluationQuery = defineQuery((t) => ({
  findFirstEventScheduleEvaluation: t.prismaField(findFirstEventScheduleEvaluationQueryObject(t)),
}));
