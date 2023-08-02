import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferTag',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.OfferTagWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.delete({ where: args.where, ...query }),
  })
)

export const deleteOneOfferTagMutation = defineMutation((t) => ({
  deleteOneOfferTag: t.prismaField(deleteOneOfferTagMutationObject(t)),
}))
