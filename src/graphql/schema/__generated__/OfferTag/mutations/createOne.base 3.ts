import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferTag',
    nullable: false,
    args: { data: t.arg({ type: Inputs.OfferTagCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.create({ data: args.data, ...query }),
  })
)

export const createOneOfferTagMutation = defineMutation((t) => ({
  createOneOfferTag: t.prismaField(createOneOfferTagMutationObject(t)),
}))
