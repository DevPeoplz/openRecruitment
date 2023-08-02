import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferTag',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.OfferTagWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.OfferTagUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneOfferTagMutation = defineMutation((t) => ({
  updateOneOfferTag: t.prismaField(updateOneOfferTagMutationObject(t)),
}))
