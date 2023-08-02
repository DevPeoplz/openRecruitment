import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Offer',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.OfferWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.delete({ where: args.where, ...query }),
  })
)

export const deleteOneOfferMutation = defineMutation((t) => ({
  deleteOneOffer: t.prismaField(deleteOneOfferMutationObject(t)),
}))
