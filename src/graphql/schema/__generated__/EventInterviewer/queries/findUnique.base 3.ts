import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueEventInterviewerQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventInterviewer',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.EventInterviewerWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventInterviewer.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueEventInterviewerQuery = defineQuery((t) => ({
  findUniqueEventInterviewer: t.prismaField(
    findUniqueEventInterviewerQueryObject(t)
  ),
}))
