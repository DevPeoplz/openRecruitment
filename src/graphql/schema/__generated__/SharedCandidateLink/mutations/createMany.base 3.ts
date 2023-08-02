import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManySharedCandidateLinkMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: ['SharedCandidateLink'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.SharedCandidateLinkCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.sharedCandidateLink.create({ data }))
        ),
    })
  )

export const createManySharedCandidateLinkMutation = defineMutation((t) => ({
  createManySharedCandidateLink: t.prismaField(
    createManySharedCandidateLinkMutationObject(t)
  ),
}))
