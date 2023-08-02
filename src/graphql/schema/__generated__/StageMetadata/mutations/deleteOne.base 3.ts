import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneStageMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'StageMetadata',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.StageMetadataWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.stageMetadata.delete({ where: args.where, ...query }),
    })
)

export const deleteOneStageMetadataMutation = defineMutation((t) => ({
  deleteOneStageMetadata: t.prismaField(
    deleteOneStageMetadataMutationObject(t)
  ),
}))
