import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferFile',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.OfferFileWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.OfferFileUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneOfferFileMutation = defineMutation((t) => ({
  updateOneOfferFile: t.prismaField(updateOneOfferFileMutationObject(t)),
}))
