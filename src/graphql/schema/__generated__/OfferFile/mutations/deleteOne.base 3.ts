import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferFile',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.OfferFileWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.delete({ where: args.where, ...query }),
  })
)

export const deleteOneOfferFileMutation = defineMutation((t) => ({
  deleteOneOfferFile: t.prismaField(deleteOneOfferFileMutationObject(t)),
}))
