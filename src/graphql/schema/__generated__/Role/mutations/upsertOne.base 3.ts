import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Role',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.RoleWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.RoleCreateInput, required: true }),
      update: t.arg({ type: Inputs.RoleUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneRoleMutation = defineMutation((t) => ({
  upsertOneRole: t.prismaField(upsertOneRoleMutationObject(t)),
}))
