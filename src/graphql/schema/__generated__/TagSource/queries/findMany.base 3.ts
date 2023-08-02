import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyTagSourceQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['TagSource'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TagSourceWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.TagSourceOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.TagSourceWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.TagSourceScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.tagSource.findMany({
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

export const findManyTagSourceQuery = defineQuery((t) => ({
  findManyTagSource: t.prismaField(findManyTagSourceQueryObject(t)),
}))
