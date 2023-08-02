import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneStageMetadataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'StageMetadata',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.StageMetadataWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.StageMetadataCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.StageMetadataUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.stageMetadata.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneStageMetadataMutation = defineMutation((t) => ({
  upsertOneStageMetadata: t.prismaField(
    upsertOneStageMetadataMutationObject(t)
  ),
}))
