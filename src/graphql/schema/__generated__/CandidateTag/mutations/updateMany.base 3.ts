import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManyCandidateTagMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({ type: Inputs.CandidateTagWhereInput, required: false }),
        data: t.arg({
          type: Inputs.CandidateTagUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.candidateTag.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
)

export const updateManyCandidateTagMutation = defineMutation((t) => ({
  updateManyCandidateTag: t.field(updateManyCandidateTagMutationObject(t)),
}))
