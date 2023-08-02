import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueRoleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Role',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.RoleWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueRoleQuery = defineQuery((t) => ({
  findUniqueRole: t.prismaField(findUniqueRoleQueryObject(t)),
}))
