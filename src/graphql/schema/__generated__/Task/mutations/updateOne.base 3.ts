import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneTaskMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Task',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TaskWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.TaskUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.task.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneTaskMutation = defineMutation((t) => ({
  updateOneTask: t.prismaField(updateOneTaskMutationObject(t)),
}))
