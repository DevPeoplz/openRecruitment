import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['OfferFile'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.OfferFileCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.offerFile.create({ data }))
      ),
  })
)

export const createManyOfferFileMutation = defineMutation((t) => ({
  createManyOfferFile: t.prismaField(createManyOfferFileMutationObject(t)),
}))
