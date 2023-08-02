import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['OfferTag'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.OfferTagCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.offerTag.create({ data }))
      ),
  })
)

export const createManyOfferTagMutation = defineMutation((t) => ({
  createManyOfferTag: t.prismaField(createManyOfferTagMutationObject(t)),
}))
