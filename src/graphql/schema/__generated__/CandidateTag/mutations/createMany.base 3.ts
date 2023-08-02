import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyCandidateTagMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['CandidateTag'],
      nullable: false,
      args: {
        data: t.arg({ type: [Inputs.CandidateTagCreateInput], required: true }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.candidateTag.create({ data }))
        ),
    })
)

export const createManyCandidateTagMutation = defineMutation((t) => ({
  createManyCandidateTag: t.prismaField(
    createManyCandidateTagMutationObject(t)
  ),
}))
