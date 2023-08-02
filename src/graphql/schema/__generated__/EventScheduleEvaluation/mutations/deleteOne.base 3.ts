import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneEventScheduleEvaluationMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'EventScheduleEvaluation',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleEvaluationWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleEvaluation.delete({
          where: args.where,
          ...query,
        }),
    })
  )

export const deleteOneEventScheduleEvaluationMutation = defineMutation((t) => ({
  deleteOneEventScheduleEvaluation: t.prismaField(
    deleteOneEventScheduleEvaluationMutationObject(t)
  ),
}))
