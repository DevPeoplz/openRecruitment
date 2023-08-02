import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferFileWhereInput, required: false }),
      data: t.arg({
        type: Inputs.OfferFileUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.offerFile.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyOfferFileMutation = defineMutation((t) => ({
  updateManyOfferFile: t.field(updateManyOfferFileMutationObject(t)),
}))
