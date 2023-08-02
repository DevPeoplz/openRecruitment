import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneEventScheduleEvaluationMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'EventScheduleEvaluation',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleEvaluationWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.EventScheduleEvaluationUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleEvaluation.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
  )

export const updateOneEventScheduleEvaluationMutation = defineMutation((t) => ({
  updateOneEventScheduleEvaluation: t.prismaField(
    updateOneEventScheduleEvaluationMutationObject(t)
  ),
}))
