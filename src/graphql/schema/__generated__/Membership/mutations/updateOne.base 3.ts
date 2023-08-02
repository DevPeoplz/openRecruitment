import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Membership',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.MembershipWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.MembershipUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.membership.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneMembershipMutation = defineMutation((t) => ({
  updateOneMembership: t.prismaField(updateOneMembershipMutationObject(t)),
}))
