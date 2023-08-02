import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Match',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.MatchWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.MatchUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneMatchMutation = defineMutation((t) => ({
  updateOneMatch: t.prismaField(updateOneMatchMutationObject(t)),
}))
