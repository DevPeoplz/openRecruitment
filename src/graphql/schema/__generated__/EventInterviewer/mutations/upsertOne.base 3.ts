import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneEventInterviewerMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventInterviewer',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventInterviewerWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.EventInterviewerCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.EventInterviewerUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventInterviewer.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneEventInterviewerMutation = defineMutation((t) => ({
  upsertOneEventInterviewer: t.prismaField(
    upsertOneEventInterviewerMutationObject(t)
  ),
}))
