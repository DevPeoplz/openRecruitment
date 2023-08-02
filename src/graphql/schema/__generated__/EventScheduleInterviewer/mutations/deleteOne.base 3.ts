import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneEventScheduleInterviewerMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'EventScheduleInterviewer',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleInterviewerWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleInterviewer.delete({
          where: args.where,
          ...query,
        }),
    })
  )

export const deleteOneEventScheduleInterviewerMutation = defineMutation(
  (t) => ({
    deleteOneEventScheduleInterviewer: t.prismaField(
      deleteOneEventScheduleInterviewerMutationObject(t)
    ),
  })
)
