import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyStageMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.StageWhereInput, required: false }),
      data: t.arg({
        type: Inputs.StageUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.stage.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyStageMutation = defineMutation((t) => ({
  updateManyStage: t.field(updateManyStageMutationObject(t)),
}))
