import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'HiringRole',
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereUniqueInput, required: true }),
      create: t.arg({ type: Inputs.HiringRoleCreateInput, required: true }),
      update: t.arg({ type: Inputs.HiringRoleUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  })
)

export const upsertOneHiringRoleMutation = defineMutation((t) => ({
  upsertOneHiringRole: t.prismaField(upsertOneHiringRoleMutationObject(t)),
}))
