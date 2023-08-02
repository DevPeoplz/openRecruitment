import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TagSource',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.TagSourceWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.tagSource.delete({ where: args.where, ...query }),
  })
)

export const deleteOneTagSourceMutation = defineMutation((t) => ({
  deleteOneTagSource: t.prismaField(deleteOneTagSourceMutationObject(t)),
}))
