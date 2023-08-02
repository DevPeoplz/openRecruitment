import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Match',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.MatchWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.MatchCreateInput, required: true }),
      update: t.arg({ type: Inputs.MatchUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneMatchMutation = defineMutation((t) => ({
  upsertOneMatch: t.prismaField(upsertOneMatchMutationObject(t)),
}))
