import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyEventEvaluationMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventEvaluationWhereInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.eventEvaluation.deleteMany({ where: args.where }),
    })
)

export const deleteManyEventEvaluationMutation = defineMutation((t) => ({
  deleteManyEventEvaluation: t.field(
    deleteManyEventEvaluationMutationObject(t)
  ),
}))
