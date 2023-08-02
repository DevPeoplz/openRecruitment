import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneSessionMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Session',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.SessionWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.SessionCreateInput, required: true }),
      update: t.arg({ type: Inputs.SessionUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneSessionMutation = defineMutation((t) => ({
  upsertOneSession: t.prismaField(upsertOneSessionMutationObject(t)),
}))
