import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneEventScheduleInterviewerMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'EventScheduleInterviewer',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.EventScheduleInterviewerCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleInterviewer.create({
          data: args.data,
          ...query,
        }),
    })
  )

export const createOneEventScheduleInterviewerMutation = defineMutation(
  (t) => ({
    createOneEventScheduleInterviewer: t.prismaField(
      createOneEventScheduleInterviewerMutationObject(t)
    ),
  })
)
