import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Evaluation'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EvaluationWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.EvaluationOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.EvaluationWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.EvaluationScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.findMany({
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

export const findManyEvaluationQuery = defineQuery((t) => ({
  findManyEvaluation: t.prismaField(findManyEvaluationQueryObject(t)),
}))
