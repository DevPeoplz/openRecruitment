import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneStageMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'StageMetadata',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.StageMetadataWhereUniqueInput,
          required: true,
        }),
        data: t.arg({ type: Inputs.StageMetadataUpdateInput, required: true }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.stageMetadata.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneStageMetadataMutation = defineMutation((t) => ({
  updateOneStageMetadata: t.prismaField(
    updateOneStageMetadataMutationObject(t)
  ),
}))
