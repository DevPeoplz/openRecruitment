import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManyCandidateCustomFieldsMutationObject =
  defineMutationFunction((t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.CandidateCustomFieldsWhereInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.candidateCustomFields.deleteMany({ where: args.where }),
    })
  )

export const deleteManyCandidateCustomFieldsMutation = defineMutation((t) => ({
  deleteManyCandidateCustomFields: t.field(
    deleteManyCandidateCustomFieldsMutationObject(t)
  ),
}))
