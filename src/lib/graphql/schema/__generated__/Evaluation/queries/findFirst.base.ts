import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Evaluation',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.EvaluationWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.EvaluationOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.EvaluationWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.EvaluationScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.findFirst({
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

export const findFirstEvaluationQuery = defineQuery((t) => ({
  findFirstEvaluation: t.prismaField(findFirstEvaluationQueryObject(t)),
}));
