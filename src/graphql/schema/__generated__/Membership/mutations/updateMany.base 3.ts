import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyMembershipMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.MembershipWhereInput, required: false }),
      data: t.arg({
        type: Inputs.MembershipUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.membership.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyMembershipMutation = defineMutation((t) => ({
  updateManyMembership: t.field(updateManyMembershipMutationObject(t)),
}))
