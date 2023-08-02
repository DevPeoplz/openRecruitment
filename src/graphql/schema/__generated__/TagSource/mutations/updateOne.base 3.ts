import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TagSource',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TagSourceWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.TagSourceUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.tagSource.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneTagSourceMutation = defineMutation((t) => ({
  updateOneTagSource: t.prismaField(updateOneTagSourceMutationObject(t)),
}))
