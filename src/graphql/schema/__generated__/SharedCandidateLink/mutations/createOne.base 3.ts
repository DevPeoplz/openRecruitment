import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneSharedCandidateLinkMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'SharedCandidateLink',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.SharedCandidateLinkCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.sharedCandidateLink.create({ data: args.data, ...query }),
    })
  )

export const createOneSharedCandidateLinkMutation = defineMutation((t) => ({
  createOneSharedCandidateLink: t.prismaField(
    createOneSharedCandidateLinkMutationObject(t)
  ),
}))
