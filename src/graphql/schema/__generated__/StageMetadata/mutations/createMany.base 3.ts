import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyStageMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['StageMetadata'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.StageMetadataCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.stageMetadata.create({ data }))
        ),
    })
)

export const createManyStageMetadataMutation = defineMutation((t) => ({
  createManyStageMetadata: t.prismaField(
    createManyStageMetadataMutationObject(t)
  ),
}))
