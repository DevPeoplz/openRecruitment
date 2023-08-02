import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneSharedCandidateLinkMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'SharedCandidateLink',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.SharedCandidateLinkWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.sharedCandidateLink.delete({
          where: args.where,
          ...query,
        }),
    })
  )

export const deleteOneSharedCandidateLinkMutation = defineMutation((t) => ({
  deleteOneSharedCandidateLink: t.prismaField(
    deleteOneSharedCandidateLinkMutationObject(t)
  ),
}))
