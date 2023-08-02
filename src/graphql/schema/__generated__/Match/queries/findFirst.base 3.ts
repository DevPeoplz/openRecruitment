import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstMatchQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Match',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.MatchWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.MatchOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.MatchWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.MatchScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.findFirst({
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

export const findFirstMatchQuery = defineQuery((t) => ({
  findFirstMatch: t.prismaField(findFirstMatchQueryObject(t)),
}))
