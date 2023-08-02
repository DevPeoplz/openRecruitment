import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateTag',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.CandidateTagWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.delete({ where: args.where, ...query }),
  })
)

export const deleteOneCandidateTagMutation = defineMutation((t) => ({
  deleteOneCandidateTag: t.prismaField(deleteOneCandidateTagMutationObject(t)),
}))
