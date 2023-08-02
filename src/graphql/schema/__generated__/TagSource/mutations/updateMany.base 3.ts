import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TagSourceWhereInput, required: false }),
      data: t.arg({
        type: Inputs.TagSourceUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.tagSource.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyTagSourceMutation = defineMutation((t) => ({
  updateManyTagSource: t.field(updateManyTagSourceMutationObject(t)),
}))
