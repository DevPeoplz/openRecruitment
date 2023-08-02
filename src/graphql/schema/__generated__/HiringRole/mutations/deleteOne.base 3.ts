import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'HiringRole',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.delete({ where: args.where, ...query }),
  })
)

export const deleteOneHiringRoleMutation = defineMutation((t) => ({
  deleteOneHiringRole: t.prismaField(deleteOneHiringRoleMutationObject(t)),
}))
