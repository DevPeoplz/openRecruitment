import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Evaluation',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.EvaluationWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueEvaluationQuery = defineQuery((t) => ({
  findUniqueEvaluation: t.prismaField(findUniqueEvaluationQueryObject(t)),
}))
