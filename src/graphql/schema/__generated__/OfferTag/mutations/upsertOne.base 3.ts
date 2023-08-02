import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferTag',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferTagWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.OfferTagCreateInput, required: true }),
      update: t.arg({ type: Inputs.OfferTagUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneOfferTagMutation = defineMutation((t) => ({
  upsertOneOfferTag: t.prismaField(upsertOneOfferTagMutationObject(t)),
}))
