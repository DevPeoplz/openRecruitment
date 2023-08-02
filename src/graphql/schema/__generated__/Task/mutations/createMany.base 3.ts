import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyTaskMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Task'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.TaskCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.task.create({ data }))
      ),
  })
)

export const createManyTaskMutation = defineMutation((t) => ({
  createManyTask: t.prismaField(createManyTaskMutationObject(t)),
}))
