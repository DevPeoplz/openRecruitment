import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyStageMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['StageMetadata'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.StageMetadataWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.StageMetadataOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.StageMetadataWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.StageMetadataScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageMetadata.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  })
)

export const findManyStageMetadataQuery = defineQuery((t) => ({
  findManyStageMetadata: t.prismaField(findManyStageMetadataQueryObject(t)),
}))
