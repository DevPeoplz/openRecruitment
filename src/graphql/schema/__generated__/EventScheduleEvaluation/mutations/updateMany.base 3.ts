import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyEventScheduleEvaluationMutationObject =
  defineMutationFunction((t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleEvaluationWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.EventScheduleEvaluationUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.eventScheduleEvaluation.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
  )

export const updateManyEventScheduleEvaluationMutation = defineMutation(
  (t) => ({
    updateManyEventScheduleEvaluation: t.field(
      updateManyEventScheduleEvaluationMutationObject(t)
    ),
  })
)
