import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueEvaluationAnswerQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EvaluationAnswer',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.EvaluationAnswerWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluationAnswer.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueEvaluationAnswerQuery = defineQuery((t) => ({
  findUniqueEvaluationAnswer: t.prismaField(
    findUniqueEvaluationAnswerQueryObject(t)
  ),
}))
