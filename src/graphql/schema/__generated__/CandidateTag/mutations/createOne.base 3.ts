import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateTag',
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.CandidateTagCreateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.create({ data: args.data, ...query }),
  })
)

export const createOneCandidateTagMutation = defineMutation((t) => ({
  createOneCandidateTag: t.prismaField(createOneCandidateTagMutationObject(t)),
}))
