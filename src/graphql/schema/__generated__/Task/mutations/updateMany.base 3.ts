import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyTaskMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TaskWhereInput, required: false }),
      data: t.arg({ type: Inputs.TaskUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.task.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyTaskMutation = defineMutation((t) => ({
  updateManyTask: t.field(updateManyTaskMutationObject(t)),
}))
