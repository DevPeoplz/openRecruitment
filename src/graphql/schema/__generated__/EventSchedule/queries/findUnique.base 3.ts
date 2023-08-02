import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueEventScheduleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventSchedule',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.EventScheduleWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventSchedule.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueEventScheduleQuery = defineQuery((t) => ({
  findUniqueEventSchedule: t.prismaField(findUniqueEventScheduleQueryObject(t)),
}))
