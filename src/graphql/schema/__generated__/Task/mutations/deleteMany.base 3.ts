import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyTaskMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.TaskWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.task.deleteMany({ where: args.where }),
  })
)

export const deleteManyTaskMutation = defineMutation((t) => ({
  deleteManyTask: t.field(deleteManyTaskMutationObject(t)),
}))
