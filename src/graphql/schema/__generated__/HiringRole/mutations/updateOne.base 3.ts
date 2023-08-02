import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'HiringRole',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.HiringRoleUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneHiringRoleMutation = defineMutation((t) => ({
  updateOneHiringRole: t.prismaField(updateOneHiringRoleMutationObject(t)),
}))
