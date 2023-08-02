import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueMatchQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Match',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.MatchWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueMatchQuery = defineQuery((t) => ({
  findUniqueMatch: t.prismaField(findUniqueMatchQueryObject(t)),
}))
