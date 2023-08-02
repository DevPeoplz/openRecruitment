import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyEventInterviewerMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventInterviewerWhereInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.eventInterviewer.deleteMany({ where: args.where }),
    })
)

export const deleteManyEventInterviewerMutation = defineMutation((t) => ({
  deleteManyEventInterviewer: t.field(
    deleteManyEventInterviewerMutationObject(t)
  ),
}))
