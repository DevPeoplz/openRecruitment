import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyOfferTagQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['OfferTag'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferTagWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.OfferTagOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.OfferTagWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.OfferTagScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.findMany({
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

export const findManyOfferTagQuery = defineQuery((t) => ({
  findManyOfferTag: t.prismaField(findManyOfferTagQueryObject(t)),
}))
