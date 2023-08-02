import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyEventScheduleEvaluationMutationObject =
  defineMutationFunction((t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleEvaluationWhereInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.eventScheduleEvaluation.deleteMany({ where: args.where }),
    })
  )

export const deleteManyEventScheduleEvaluationMutation = defineMutation(
  (t) => ({
    deleteManyEventScheduleEvaluation: t.field(
      deleteManyEventScheduleEvaluationMutationObject(t)
    ),
  })
)
