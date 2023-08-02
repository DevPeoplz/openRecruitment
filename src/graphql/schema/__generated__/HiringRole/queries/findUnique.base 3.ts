import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueHiringRoleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'HiringRole',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueHiringRoleQuery = defineQuery((t) => ({
  findUniqueHiringRole: t.prismaField(findUniqueHiringRoleQueryObject(t)),
}))
