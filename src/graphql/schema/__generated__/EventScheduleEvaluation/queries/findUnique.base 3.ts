import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueEventScheduleEvaluationQueryObject = defineQueryFunction(
  (t) =>
    defineQueryPrismaObject({
      type: 'EventScheduleEvaluation',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleEvaluationWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleEvaluation.findUnique({
          where: args.where,
          ...query,
        }),
    })
)

export const findUniqueEventScheduleEvaluationQuery = defineQuery((t) => ({
  findUniqueEventScheduleEvaluation: t.prismaField(
    findUniqueEventScheduleEvaluationQueryObject(t)
  ),
}))
