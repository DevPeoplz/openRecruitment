import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneTaskMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Task',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TaskWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.task.delete({ where: args.where, ...query }),
  })
)

export const deleteOneTaskMutation = defineMutation((t) => ({
  deleteOneTask: t.prismaField(deleteOneTaskMutationObject(t)),
}))
