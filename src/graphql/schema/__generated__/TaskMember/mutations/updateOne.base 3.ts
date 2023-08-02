import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TaskMember',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TaskMemberWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.TaskMemberUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneTaskMemberMutation = defineMutation((t) => ({
  updateOneTaskMember: t.prismaField(updateOneTaskMemberMutationObject(t)),
}))
