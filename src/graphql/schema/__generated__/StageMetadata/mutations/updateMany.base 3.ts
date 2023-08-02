import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyStageMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.StageMetadataWhereInput, required: false }),
        data: t.arg({
          type: Inputs.StageMetadataUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.stageMetadata.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
)

export const updateManyStageMetadataMutation = defineMutation((t) => ({
  updateManyStageMetadata: t.field(updateManyStageMetadataMutationObject(t)),
}))
