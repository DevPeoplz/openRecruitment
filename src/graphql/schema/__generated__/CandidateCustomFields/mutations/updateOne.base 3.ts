import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneCandidateCustomFieldsMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'CandidateCustomFields',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.CandidateCustomFieldsWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.CandidateCustomFieldsUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.candidateCustomFields.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
  )

export const updateOneCandidateCustomFieldsMutation = defineMutation((t) => ({
  updateOneCandidateCustomFields: t.prismaField(
    updateOneCandidateCustomFieldsMutationObject(t)
  ),
}))
