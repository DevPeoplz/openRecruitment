import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryObject,
} from '../../utils'

export const countEventScheduleInterviewerQueryObject = defineQueryFunction(
  (t) =>
    defineQueryObject({
      type: 'Int',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.EventScheduleInterviewerWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.EventScheduleInterviewerOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.EventScheduleInterviewerWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.EventScheduleInterviewerScalarFieldEnum],
          required: false,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.eventScheduleInterviewer.count({
          where: args.where || undefined,
          cursor: args.cursor || undefined,
          take: args.take || undefined,
          distinct: args.distinct || undefined,
          skip: args.skip || undefined,
          orderBy: args.orderBy || undefined,
        }),
    })
)

export const countEventScheduleInterviewerQuery = defineQuery((t) => ({
  countEventScheduleInterviewer: t.field(
    countEventScheduleInterviewerQueryObject(t)
  ),
}))
