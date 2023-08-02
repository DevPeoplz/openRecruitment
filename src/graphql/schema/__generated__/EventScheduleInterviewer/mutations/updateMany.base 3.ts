import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyEventScheduleInterviewerMutationObject =
  defineMutationFunction((t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleInterviewerWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.EventScheduleInterviewerUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.eventScheduleInterviewer.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
  )

export const updateManyEventScheduleInterviewerMutation = defineMutation(
  (t) => ({
    updateManyEventScheduleInterviewer: t.field(
      updateManyEventScheduleInterviewerMutationObject(t)
    ),
  })
)
