import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstHiringRoleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'HiringRole',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.HiringRoleOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.HiringRoleWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.HiringRoleScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.findFirst({
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

export const findFirstHiringRoleQuery = defineQuery((t) => ({
  findFirstHiringRole: t.prismaField(findFirstHiringRoleQueryObject(t)),
}))
