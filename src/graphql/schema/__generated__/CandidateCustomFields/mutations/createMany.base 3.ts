import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyCandidateCustomFieldsMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: ['CandidateCustomFields'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.CandidateCustomFieldsCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.candidateCustomFields.create({ data }))
        ),
    })
  )

export const createManyCandidateCustomFieldsMutation = defineMutation((t) => ({
  createManyCandidateCustomFields: t.prismaField(
    createManyCandidateCustomFieldsMutationObject(t)
  ),
}))
