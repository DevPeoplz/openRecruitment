import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyStageVisibilityMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.StageVisibilityWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.StageVisibilityUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.stageVisibility.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
)

export const updateManyStageVisibilityMutation = defineMutation((t) => ({
  updateManyStageVisibility: t.field(
    updateManyStageVisibilityMutationObject(t)
  ),
}))
