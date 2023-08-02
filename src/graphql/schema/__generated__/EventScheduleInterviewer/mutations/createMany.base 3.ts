import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyEventScheduleInterviewerMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: ['EventScheduleInterviewer'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.EventScheduleInterviewerCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) =>
            prisma.eventScheduleInterviewer.create({ data })
          )
        ),
    })
  )

export const createManyEventScheduleInterviewerMutation = defineMutation(
  (t) => ({
    createManyEventScheduleInterviewer: t.prismaField(
      createManyEventScheduleInterviewerMutationObject(t)
    ),
  })
)
