import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyDisqualifyReasonMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.DisqualifyReasonWhereInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.disqualifyReason.deleteMany({ where: args.where }),
    })
)

export const deleteManyDisqualifyReasonMutation = defineMutation((t) => ({
  deleteManyDisqualifyReason: t.field(
    deleteManyDisqualifyReasonMutationObject(t)
  ),
}))
