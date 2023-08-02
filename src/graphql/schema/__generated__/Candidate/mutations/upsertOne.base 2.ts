import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.CandidateWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.CandidateCreateInput, required: true }),
      update: t.arg({ type: Inputs.CandidateUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneCandidateMutation = defineMutation((t) => ({
  upsertOneCandidate: t.prismaField(upsertOneCandidateMutationObject(t)),
}))
