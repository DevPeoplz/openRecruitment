import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateTag',
    nullable: false,
    args: {
      where: t.arg({
        type: Inputs.CandidateTagWhereUniqueInput,
        required: true,
      }),
      create: t.arg({ type: Inputs.CandidateTagCreateInput, required: true }),
      update: t.arg({ type: Inputs.CandidateTagUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneCandidateTagMutation = defineMutation((t) => ({
  upsertOneCandidateTag: t.prismaField(upsertOneCandidateTagMutationObject(t)),
}))
