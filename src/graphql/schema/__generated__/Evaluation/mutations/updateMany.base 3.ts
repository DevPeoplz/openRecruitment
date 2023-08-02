import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EvaluationWhereInput, required: false }),
      data: t.arg({
        type: Inputs.EvaluationUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.evaluation.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyEvaluationMutation = defineMutation((t) => ({
  updateManyEvaluation: t.field(updateManyEvaluationMutationObject(t)),
}))
