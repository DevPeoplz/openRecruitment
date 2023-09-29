import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countEvaluationAnswerQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EvaluationAnswerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EvaluationAnswerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EvaluationAnswerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EvaluationAnswerScalarFieldEnum], required: false }),
}))

export const countEvaluationAnswerQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countEvaluationAnswerQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.evaluationAnswer.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countEvaluationAnswerQuery = defineQuery((t) => ({
  countEvaluationAnswer: t.field(countEvaluationAnswerQueryObject(t)),
}));
