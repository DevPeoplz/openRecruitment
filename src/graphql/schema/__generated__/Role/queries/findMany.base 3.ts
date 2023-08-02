import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyRoleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Role'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.RoleWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.RoleOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({ type: Inputs.RoleWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.RoleScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.findMany({
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

export const findManyRoleQuery = defineQuery((t) => ({
  findManyRole: t.prismaField(findManyRoleQueryObject(t)),
}))
