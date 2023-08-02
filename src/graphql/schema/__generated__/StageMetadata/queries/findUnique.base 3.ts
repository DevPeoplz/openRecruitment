import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueStageMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'StageMetadata',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.StageMetadataWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageMetadata.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueStageMetadataQuery = defineQuery((t) => ({
  findUniqueStageMetadata: t.prismaField(findUniqueStageMetadataQueryObject(t)),
}))
