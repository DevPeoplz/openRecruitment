import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TaskMemberWhereInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.taskMember.deleteMany({ where: args.where }),
  })
)

export const deleteManyTaskMemberMutation = defineMutation((t) => ({
  deleteManyTaskMember: t.field(deleteManyTaskMemberMutationObject(t)),
}))
