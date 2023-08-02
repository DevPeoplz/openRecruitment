import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneSessionMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Session',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.SessionWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.SessionUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneSessionMutation = defineMutation((t) => ({
  updateOneSession: t.prismaField(updateOneSessionMutationObject(t)),
}))
