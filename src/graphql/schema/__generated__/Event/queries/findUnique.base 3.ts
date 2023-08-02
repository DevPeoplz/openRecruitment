import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueEventQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Event',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.EventWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.event.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueEventQuery = defineQuery((t) => ({
  findUniqueEvent: t.prismaField(findUniqueEventQueryObject(t)),
}))
