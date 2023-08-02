import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueOfferQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Offer',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.OfferWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueOfferQuery = defineQuery((t) => ({
  findUniqueOffer: t.prismaField(findUniqueOfferQueryObject(t)),
}))
