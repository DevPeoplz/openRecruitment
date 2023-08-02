import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferFile',
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.OfferFileCreateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.create({ data: args.data, ...query }),
  })
)

export const createOneOfferFileMutation = defineMutation((t) => ({
  createOneOfferFile: t.prismaField(createOneOfferFileMutationObject(t)),
}))
