import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyOfferMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.OfferWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.offer.deleteMany({ where: args.where }),
  })
)

export const deleteManyOfferMutation = defineMutation((t) => ({
  deleteManyOffer: t.field(deleteManyOfferMutationObject(t)),
}))
