import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Candidate'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.CandidateCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.candidate.create({ data }))
      ),
  })
)

export const createManyCandidateMutation = defineMutation((t) => ({
  createManyCandidate: t.prismaField(createManyCandidateMutationObject(t)),
}))
