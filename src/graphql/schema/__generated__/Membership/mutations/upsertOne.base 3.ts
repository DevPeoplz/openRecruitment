import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Membership',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.MembershipWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.MembershipCreateInput, required: true }),
      update: t.arg({ type: Inputs.MembershipUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.membership.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneMembershipMutation = defineMutation((t) => ({
  upsertOneMembership: t.prismaField(upsertOneMembershipMutationObject(t)),
}))
