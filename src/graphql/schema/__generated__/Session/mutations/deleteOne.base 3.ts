import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneSessionMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Session',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.SessionWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.delete({ where: args.where, ...query }),
  })
)

export const deleteOneSessionMutation = defineMutation((t) => ({
  deleteOneSession: t.prismaField(deleteOneSessionMutationObject(t)),
}))
