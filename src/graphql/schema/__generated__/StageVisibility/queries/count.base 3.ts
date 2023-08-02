import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryObject,
} from '../../utils'

export const countStageVisibilityQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.StageVisibilityWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.StageVisibilityOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.StageVisibilityWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.StageVisibilityScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.stageVisibility.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  })
)

export const countStageVisibilityQuery = defineQuery((t) => ({
  countStageVisibility: t.field(countStageVisibilityQueryObject(t)),
}))
