import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManySharedCandidateLinkMutationObject =
  defineMutationFunction((t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.SharedCandidateLinkWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.SharedCandidateLinkUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.sharedCandidateLink.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
  )

export const updateManySharedCandidateLinkMutation = defineMutation((t) => ({
  updateManySharedCandidateLink: t.field(
    updateManySharedCandidateLinkMutationObject(t)
  ),
}))
