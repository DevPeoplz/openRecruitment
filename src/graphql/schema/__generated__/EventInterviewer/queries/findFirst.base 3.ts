import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstEventInterviewerQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventInterviewer',
    nullable: true,
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
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventInterviewer.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  })
)

export const findFirstEventInterviewerQuery = defineQuery((t) => ({
  findFirstEventInterviewer: t.prismaField(
    findFirstEventInterviewerQueryObject(t)
  ),
}))
