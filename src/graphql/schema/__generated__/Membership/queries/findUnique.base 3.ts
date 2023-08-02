import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueMembershipQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Membership',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.MembershipWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.membership.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueMembershipQuery = defineQuery((t) => ({
  findUniqueMembership: t.prismaField(findUniqueMembershipQueryObject(t)),
}))
