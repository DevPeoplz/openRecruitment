import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyStageMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({ type: Inputs.StageMetadataWhereInput, required: true }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.stageMetadata.deleteMany({ where: args.where }),
    })
)

export const deleteManyStageMetadataMutation = defineMutation((t) => ({
  deleteManyStageMetadata: t.field(deleteManyStageMetadataMutationObject(t)),
}))
