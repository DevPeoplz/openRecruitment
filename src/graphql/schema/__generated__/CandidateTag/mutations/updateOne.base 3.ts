import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateTag',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.CandidateTagWhereUniqueInput,
        required: true,
      }),
      data: t.arg({ type: Inputs.CandidateTagUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneCandidateTagMutation = defineMutation((t) => ({
  updateOneCandidateTag: t.prismaField(updateOneCandidateTagMutationObject(t)),
}))
