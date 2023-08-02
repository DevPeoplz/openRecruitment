import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Match'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.MatchCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.match.create({ data }))
      ),
  })
)

export const createManyMatchMutation = defineMutation((t) => ({
  createManyMatch: t.prismaField(createManyMatchMutationObject(t)),
}))
