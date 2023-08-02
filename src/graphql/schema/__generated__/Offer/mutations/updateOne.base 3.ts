import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Offer',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.OfferWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.OfferUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneOfferMutation = defineMutation((t) => ({
  updateOneOffer: t.prismaField(updateOneOfferMutationObject(t)),
}))
