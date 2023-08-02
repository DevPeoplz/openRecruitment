import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneEventInterviewerMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventInterviewer',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventInterviewerWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.EventInterviewerUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventInterviewer.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneEventInterviewerMutation = defineMutation((t) => ({
  updateOneEventInterviewer: t.prismaField(
    updateOneEventInterviewerMutationObject(t)
  ),
}))
