import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countEventEvaluationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventEvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventEvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventEvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventEvaluationScalarFieldEnum], required: false }),
}))

export const countEventEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countEventEvaluationQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventEvaluation.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countEventEvaluationQuery = defineQuery((t) => ({
  countEventEvaluation: t.field(countEventEvaluationQueryObject(t)),
}));
