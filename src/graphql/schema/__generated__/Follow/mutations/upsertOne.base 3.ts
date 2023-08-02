import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.FollowWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.FollowCreateInput, required: true }),
      update: t.arg({ type: Inputs.FollowUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.follow.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneFollowMutation = defineMutation((t) => ({
  upsertOneFollow: t.prismaField(upsertOneFollowMutationObject(t)),
}))
