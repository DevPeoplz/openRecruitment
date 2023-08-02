import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneEventScheduleInterviewerMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'EventScheduleInterviewer',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleInterviewerWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.EventScheduleInterviewerUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleInterviewer.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
  )

export const updateOneEventScheduleInterviewerMutation = defineMutation(
  (t) => ({
    updateOneEventScheduleInterviewer: t.prismaField(
      updateOneEventScheduleInterviewerMutationObject(t)
    ),
  })
)
