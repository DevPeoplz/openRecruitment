import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneCandidateCustomFieldsMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'CandidateCustomFields',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.CandidateCustomFieldsCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.candidateCustomFields.create({
          data: args.data,
          ...query,
        }),
    })
  )

export const createOneCandidateCustomFieldsMutation = defineMutation((t) => ({
  createOneCandidateCustomFields: t.prismaField(
    createOneCandidateCustomFieldsMutationObject(t)
  ),
}))
