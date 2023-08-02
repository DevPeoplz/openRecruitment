import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Role',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.RoleWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.RoleUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneRoleMutation = defineMutation((t) => ({
  updateOneRole: t.prismaField(updateOneRoleMutationObject(t)),
}))
