import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneEventInterviewerMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventInterviewer',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.EventInterviewerCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventInterviewer.create({ data: args.data, ...query }),
    })
)

export const createOneEventInterviewerMutation = defineMutation((t) => ({
  createOneEventInterviewer: t.prismaField(
    createOneEventInterviewerMutationObject(t)
  ),
}))
