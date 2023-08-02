import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CandidateWhereInput, required: false }),
      data: t.arg({
        type: Inputs.CandidateUpdateManyMutationInput,
        required: true,
      }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.candidate.updateMany({
        where: args.where || undefined,
        data: args.data,
      }),
  })
)

export const updateManyCandidateMutation = defineMutation((t) => ({
  updateManyCandidate: t.field(updateManyCandidateMutationObject(t)),
}))
