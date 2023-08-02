import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Membership'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.MembershipCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.membership.create({ data }))
      ),
  })
)

export const createManyMembershipMutation = defineMutation((t) => ({
  createManyMembership: t.prismaField(createManyMembershipMutationObject(t)),
}))
