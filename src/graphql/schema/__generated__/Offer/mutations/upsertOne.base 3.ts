import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Offer',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.OfferCreateInput, required: true }),
      update: t.arg({ type: Inputs.OfferUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneOfferMutation = defineMutation((t) => ({
  upsertOneOffer: t.prismaField(upsertOneOfferMutationObject(t)),
}))
