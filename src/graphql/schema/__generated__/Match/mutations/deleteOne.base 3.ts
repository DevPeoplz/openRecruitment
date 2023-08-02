import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Match',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.MatchWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.delete({ where: args.where, ...query }),
  })
)

export const deleteOneMatchMutation = defineMutation((t) => ({
  deleteOneMatch: t.prismaField(deleteOneMatchMutationObject(t)),
}))
