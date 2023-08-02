import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstTalentPoolMatchQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'TalentPoolMatch',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TalentPoolMatchWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.TalentPoolMatchOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.TalentPoolMatchWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.TalentPoolMatchScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolMatch.findFirst({
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

export const findFirstTalentPoolMatchQuery = defineQuery((t) => ({
  findFirstTalentPoolMatch: t.prismaField(
    findFirstTalentPoolMatchQueryObject(t)
  ),
}))
