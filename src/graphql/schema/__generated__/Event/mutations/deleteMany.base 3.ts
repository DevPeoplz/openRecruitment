import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyEventMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.EventWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.event.deleteMany({ where: args.where }),
  })
)

export const deleteManyEventMutation = defineMutation((t) => ({
  deleteManyEvent: t.field(deleteManyEventMutationObject(t)),
}))
