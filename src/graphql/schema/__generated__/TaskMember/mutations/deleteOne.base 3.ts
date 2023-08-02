import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TaskMember',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TaskMemberWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.delete({ where: args.where, ...query }),
  })
)

export const deleteOneTaskMemberMutation = defineMutation((t) => ({
  deleteOneTaskMember: t.prismaField(deleteOneTaskMemberMutationObject(t)),
}))
