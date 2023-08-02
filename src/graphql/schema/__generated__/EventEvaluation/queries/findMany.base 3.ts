import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyEventEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['EventEvaluation'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EventEvaluationWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.EventEvaluationOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.EventEvaluationWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.EventEvaluationScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventEvaluation.findMany({
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

export const findManyEventEvaluationQuery = defineQuery((t) => ({
  findManyEventEvaluation: t.prismaField(findManyEventEvaluationQueryObject(t)),
}))
