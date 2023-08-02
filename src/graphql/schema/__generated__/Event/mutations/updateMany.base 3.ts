import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyEventMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.EventWhereInput, required: false }),
      data: t.arg({
        type: Inputs.EventUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.event.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyEventMutation = defineMutation((t) => ({
  updateManyEvent: t.field(updateManyEventMutationObject(t)),
}))
