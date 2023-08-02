import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Match',
    nullable: false,
    args: { data: t.arg({ type: Inputs.MatchCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.create({ data: args.data, ...query }),
  })
)

export const createOneMatchMutation = defineMutation((t) => ({
  createOneMatch: t.prismaField(createOneMatchMutationObject(t)),
}))
