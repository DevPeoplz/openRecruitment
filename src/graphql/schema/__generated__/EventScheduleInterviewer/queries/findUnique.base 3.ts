import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueEventScheduleInterviewerQueryObject =
  defineQueryFunction((t) =>
    defineQueryPrismaObject({
      type: 'EventScheduleInterviewer',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleInterviewerWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.eventScheduleInterviewer.findUnique({
          where: args.where,
          ...query,
        }),
    })
  )

export const findUniqueEventScheduleInterviewerQuery = defineQuery((t) => ({
  findUniqueEventScheduleInterviewer: t.prismaField(
    findUniqueEventScheduleInterviewerQueryObject(t)
  ),
}))
