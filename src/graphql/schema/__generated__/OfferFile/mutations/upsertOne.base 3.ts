import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferFile',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferFileWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.OfferFileCreateInput, required: true }),
      update: t.arg({ type: Inputs.OfferFileUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneOfferFileMutation = defineMutation((t) => ({
  upsertOneOfferFile: t.prismaField(upsertOneOfferFileMutationObject(t)),
}))
