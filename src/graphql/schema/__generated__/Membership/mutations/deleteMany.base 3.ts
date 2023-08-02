import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.MembershipWhereInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.membership.deleteMany({ where: args.where }),
  })
)

export const deleteManyMembershipMutation = defineMutation((t) => ({
  deleteManyMembership: t.field(deleteManyMembershipMutationObject(t)),
}))
