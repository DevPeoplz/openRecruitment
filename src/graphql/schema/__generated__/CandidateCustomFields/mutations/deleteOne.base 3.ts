import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneCandidateCustomFieldsMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'CandidateCustomFields',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.CandidateCustomFieldsWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.candidateCustomFields.delete({
          where: args.where,
          ...query,
        }),
    })
  )

export const deleteOneCandidateCustomFieldsMutation = defineMutation((t) => ({
  deleteOneCandidateCustomFields: t.prismaField(
    deleteOneCandidateCustomFieldsMutationObject(t)
  ),
}))
