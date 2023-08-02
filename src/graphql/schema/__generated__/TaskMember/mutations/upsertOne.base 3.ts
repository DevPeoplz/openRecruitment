import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TaskMember',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TaskMemberWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.TaskMemberCreateInput, required: true }),
      update: t.arg({ type: Inputs.TaskMemberUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneTaskMemberMutation = defineMutation((t) => ({
  upsertOneTaskMember: t.prismaField(upsertOneTaskMemberMutationObject(t)),
}))
