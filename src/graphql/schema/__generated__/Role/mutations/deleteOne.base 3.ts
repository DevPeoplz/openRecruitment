import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Role',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.RoleWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.delete({ where: args.where, ...query }),
  })
)

export const deleteOneRoleMutation = defineMutation((t) => ({
  deleteOneRole: t.prismaField(deleteOneRoleMutationObject(t)),
}))
