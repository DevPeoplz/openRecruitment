import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CandidateWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.delete({ where: args.where, ...query }),
  })
)

export const deleteOneCandidateMutation = defineMutation((t) => ({
  deleteOneCandidate: t.prismaField(deleteOneCandidateMutationObject(t)),
}))
