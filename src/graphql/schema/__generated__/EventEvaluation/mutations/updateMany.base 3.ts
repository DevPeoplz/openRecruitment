import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyEventEvaluationMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventEvaluationWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.EventEvaluationUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.eventEvaluation.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
)

export const updateManyEventEvaluationMutation = defineMutation((t) => ({
  updateManyEventEvaluation: t.field(
    updateManyEventEvaluationMutationObject(t)
  ),
}))
