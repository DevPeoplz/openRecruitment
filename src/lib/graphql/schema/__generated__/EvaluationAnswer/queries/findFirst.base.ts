import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstEvaluationAnswerQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EvaluationAnswerWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EvaluationAnswerOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EvaluationAnswerWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EvaluationAnswerScalarFieldEnum], required: false }),
}))

export const findFirstEvaluationAnswerQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EvaluationAnswer',
    nullable: true,
    args: findFirstEvaluationAnswerQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluationAnswer.findFirst({
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

export const findFirstEvaluationAnswerQuery = defineQuery((t) => ({
  findFirstEvaluationAnswer: t.prismaField(findFirstEvaluationAnswerQueryObject(t)),
}));
