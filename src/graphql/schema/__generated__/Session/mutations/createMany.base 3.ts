import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManySessionMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Session'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.SessionCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.session.create({ data }))
      ),
  })
)

export const createManySessionMutation = defineMutation((t) => ({
  createManySession: t.prismaField(createManySessionMutationObject(t)),
}))
