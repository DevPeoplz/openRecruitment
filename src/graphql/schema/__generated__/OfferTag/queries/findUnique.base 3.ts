import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueOfferTagQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'OfferTag',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.OfferTagWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueOfferTagQuery = defineQuery((t) => ({
  findUniqueOfferTag: t.prismaField(findUniqueOfferTagQueryObject(t)),
}))
