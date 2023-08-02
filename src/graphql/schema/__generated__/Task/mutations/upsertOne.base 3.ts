import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneTaskMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Task',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TaskWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.TaskCreateInput, required: true }),
      update: t.arg({ type: Inputs.TaskUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.task.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneTaskMutation = defineMutation((t) => ({
  upsertOneTask: t.prismaField(upsertOneTaskMutationObject(t)),
}))
