import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryObject,
} from '../../utils'

export const countEvaluationAnswerQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
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
    resolve: async (_root, args, _context, _info) =>
      await prisma.evaluationAnswer.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  })
)

export const countEvaluationAnswerQuery = defineQuery((t) => ({
  countEvaluationAnswer: t.field(countEvaluationAnswerQueryObject(t)),
}))
