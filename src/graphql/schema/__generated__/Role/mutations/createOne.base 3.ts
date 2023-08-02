import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Role',
    nullable: false,
    args: { data: t.arg({ type: Inputs.RoleCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.create({ data: args.data, ...query }),
  })
)

export const createOneRoleMutation = defineMutation((t) => ({
  createOneRole: t.prismaField(createOneRoleMutationObject(t)),
}))
