import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyEventScheduleInterviewerMutationObject =
  defineMutationFunction((t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleInterviewerWhereInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.eventScheduleInterviewer.deleteMany({ where: args.where }),
    })
  )

export const deleteManyEventScheduleInterviewerMutation = defineMutation(
  (t) => ({
    deleteManyEventScheduleInterviewer: t.field(
      deleteManyEventScheduleInterviewerMutationObject(t)
    ),
  })
)
