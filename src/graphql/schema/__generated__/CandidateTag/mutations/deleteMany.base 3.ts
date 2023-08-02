import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyCandidateTagMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({ type: Inputs.CandidateTagWhereInput, required: true }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.candidateTag.deleteMany({ where: args.where }),
    })
)

export const deleteManyCandidateTagMutation = defineMutation((t) => ({
  deleteManyCandidateTag: t.field(deleteManyCandidateTagMutationObject(t)),
}))
