import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneEventInterviewerMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'EventInterviewer',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventInterviewerWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventInterviewer.delete({ where: args.where, ...query }),
    })
)

export const deleteOneEventInterviewerMutation = defineMutation((t) => ({
  deleteOneEventInterviewer: t.prismaField(
    deleteOneEventInterviewerMutationObject(t)
  ),
}))
