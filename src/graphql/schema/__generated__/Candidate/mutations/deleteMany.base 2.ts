import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CandidateWhereInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.candidate.deleteMany({ where: args.where }),
  })
)

export const deleteManyCandidateMutation = defineMutation((t) => ({
  deleteManyCandidate: t.field(deleteManyCandidateMutationObject(t)),
}))
