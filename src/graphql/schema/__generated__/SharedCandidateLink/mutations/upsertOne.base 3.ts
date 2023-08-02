import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneSharedCandidateLinkMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'SharedCandidateLink',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.SharedCandidateLinkWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.SharedCandidateLinkCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.SharedCandidateLinkUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.sharedCandidateLink.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
  )

export const upsertOneSharedCandidateLinkMutation = defineMutation((t) => ({
  upsertOneSharedCandidateLink: t.prismaField(
    upsertOneSharedCandidateLinkMutationObject(t)
  ),
}))
