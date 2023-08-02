import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneEventScheduleInterviewerMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'EventScheduleInterviewer',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleInterviewerWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.EventScheduleInterviewerCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.EventScheduleInterviewerUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleInterviewer.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
  )

export const upsertOneEventScheduleInterviewerMutation = defineMutation(
  (t) => ({
    upsertOneEventScheduleInterviewer: t.prismaField(
      upsertOneEventScheduleInterviewerMutationObject(t)
    ),
  })
)
