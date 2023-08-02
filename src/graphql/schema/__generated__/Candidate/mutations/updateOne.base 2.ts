import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CandidateWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.CandidateUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneCandidateMutation = defineMutation((t) => ({
  updateOneCandidate: t.prismaField(updateOneCandidateMutationObject(t)),
}))
