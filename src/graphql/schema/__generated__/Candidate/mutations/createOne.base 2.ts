import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.CandidateCreateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.create({ data: args.data, ...query }),
  })
)

export const createOneCandidateMutation = defineMutation((t) => ({
  createOneCandidate: t.prismaField(createOneCandidateMutationObject(t)),
}))
