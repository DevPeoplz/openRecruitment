import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TagSource',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TagSourceWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.TagSourceCreateInput, required: true }),
      update: t.arg({ type: Inputs.TagSourceUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.tagSource.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneTagSourceMutation = defineMutation((t) => ({
  upsertOneTagSource: t.prismaField(upsertOneTagSourceMutationObject(t)),
}))
