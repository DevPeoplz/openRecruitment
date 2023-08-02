import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueSessionQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Session',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.SessionWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueSessionQuery = defineQuery((t) => ({
  findUniqueSession: t.prismaField(findUniqueSessionQueryObject(t)),
}))
