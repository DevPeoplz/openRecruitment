import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryObject,
} from '../../utils'

export const countEventInterviewerQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: {
      where: t.arg({
        type: Inputs.EventInterviewerWhereInput,
        required: false,
      }),
      orderBy: t.arg({
        type: [Inputs.EventInterviewerOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.EventInterviewerWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.EventInterviewerScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventInterviewer.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  })
)

export const countEventInterviewerQuery = defineQuery((t) => ({
  countEventInterviewer: t.field(countEventInterviewerQueryObject(t)),
}))
