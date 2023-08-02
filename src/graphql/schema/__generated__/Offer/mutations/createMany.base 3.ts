import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Offer'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.OfferCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.offer.create({ data }))
      ),
  })
)

export const createManyOfferMutation = defineMutation((t) => ({
  createManyOffer: t.prismaField(createManyOfferMutationObject(t)),
}))
