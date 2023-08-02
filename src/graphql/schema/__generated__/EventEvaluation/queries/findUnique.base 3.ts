import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueEventEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventEvaluation',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.EventEvaluationWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventEvaluation.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueEventEvaluationQuery = defineQuery((t) => ({
  findUniqueEventEvaluation: t.prismaField(
    findUniqueEventEvaluationQueryObject(t)
  ),
}))
