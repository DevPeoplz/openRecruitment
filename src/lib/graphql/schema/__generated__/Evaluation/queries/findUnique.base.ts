import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueEvaluationQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EvaluationWhereUniqueInput, required: true }) }))

export const findUniqueEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Evaluation',
    nullable: true,
    args: findUniqueEvaluationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueEvaluationQuery = defineQuery((t) => ({
  findUniqueEvaluation: t.prismaField(findUniqueEvaluationQueryObject(t)),
}));
