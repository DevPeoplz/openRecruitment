import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.OfferTagWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.offerTag.deleteMany({ where: args.where }),
  })
)

export const deleteManyOfferTagMutation = defineMutation((t) => ({
  deleteManyOfferTag: t.field(deleteManyOfferTagMutationObject(t)),
}))
