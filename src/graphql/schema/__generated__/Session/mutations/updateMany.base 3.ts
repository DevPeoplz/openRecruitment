import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManySessionMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.SessionWhereInput, required: false }),
      data: t.arg({
        type: Inputs.SessionUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.session.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManySessionMutation = defineMutation((t) => ({
  updateManySession: t.field(updateManySessionMutationObject(t)),
}))
