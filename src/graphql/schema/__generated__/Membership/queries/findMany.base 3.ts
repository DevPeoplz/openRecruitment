import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyMembershipQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Membership'],
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.MembershipWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.MembershipOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.MembershipWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.MembershipScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.membership.findMany({
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

export const findManyMembershipQuery = defineQuery((t) => ({
  findManyMembership: t.prismaField(findManyMembershipQueryObject(t)),
}))
