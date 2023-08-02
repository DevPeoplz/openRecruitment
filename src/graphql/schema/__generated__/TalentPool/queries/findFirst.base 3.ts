import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstTalentPoolQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TalentPool',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TalentPoolWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.TalentPoolOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.TalentPoolWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.TalentPoolScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.findFirst({
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

export const findFirstTalentPoolQuery = defineQuery((t) => ({
  findFirstTalentPool: t.prismaField(findFirstTalentPoolQueryObject(t)),
}))
