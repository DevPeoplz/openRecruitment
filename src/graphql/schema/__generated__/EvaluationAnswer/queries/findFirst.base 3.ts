import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstEvaluationAnswerQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EvaluationAnswer',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.EvaluationAnswerWhereInput,
        required: false,
      }),
      orderBy: t.arg({
        type: [Inputs.EvaluationAnswerOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.EvaluationAnswerWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.EvaluationAnswerScalarFieldEnum],
        required: false,
      }),
    },
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
  })
)

export const findFirstEvaluationAnswerQuery = defineQuery((t) => ({
  findFirstEvaluationAnswer: t.prismaField(
    findFirstEvaluationAnswerQueryObject(t)
  ),
}))
