import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstSessionQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Session',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.SessionWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.SessionOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.SessionWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.SessionScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.findFirst({
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

export const findFirstSessionQuery = defineQuery((t) => ({
  findFirstSession: t.prismaField(findFirstSessionQueryObject(t)),
}))
