import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstStageQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Stage',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.StageWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.StageOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.StageWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.StageScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.findFirst({
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

export const findFirstStageQuery = defineQuery((t) => ({
  findFirstStage: t.prismaField(findFirstStageQueryObject(t)),
}))
