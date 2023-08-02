import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManySharedCandidateLinkMutationObject =
  defineMutationFunction((t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.SharedCandidateLinkWhereInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.sharedCandidateLink.deleteMany({ where: args.where }),
    })
  )

export const deleteManySharedCandidateLinkMutation = defineMutation((t) => ({
  deleteManySharedCandidateLink: t.field(
    deleteManySharedCandidateLinkMutationObject(t)
  ),
}))
