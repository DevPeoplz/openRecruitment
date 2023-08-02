import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstMembershipQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Membership',
    nullable: true,
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
      await prisma.membership.findFirst({
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

export const findFirstMembershipQuery = defineQuery((t) => ({
  findFirstMembership: t.prismaField(findFirstMembershipQueryObject(t)),
}))
