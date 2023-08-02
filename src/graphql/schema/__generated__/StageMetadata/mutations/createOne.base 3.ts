import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneStageMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'StageMetadata',
      nullable: false,
      args: {
        data: t.arg({ type: Inputs.StageMetadataCreateInput, required: true }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.stageMetadata.create({ data: args.data, ...query }),
    })
)

export const createOneStageMetadataMutation = defineMutation((t) => ({
  createOneStageMetadata: t.prismaField(
    createOneStageMetadataMutationObject(t)
  ),
}))
