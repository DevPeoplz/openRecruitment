import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyDisqualifyReasonMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.DisqualifyReasonWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.DisqualifyReasonUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.disqualifyReason.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
)

export const updateManyDisqualifyReasonMutation = defineMutation((t) => ({
  updateManyDisqualifyReason: t.field(
    updateManyDisqualifyReasonMutationObject(t)
  ),
}))
