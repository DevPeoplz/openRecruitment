import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyOfferQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Offer'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.OfferOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.OfferWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.OfferScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.findMany({
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

export const findManyOfferQuery = defineQuery((t) => ({
  findManyOffer: t.prismaField(findManyOfferQueryObject(t)),
}))
