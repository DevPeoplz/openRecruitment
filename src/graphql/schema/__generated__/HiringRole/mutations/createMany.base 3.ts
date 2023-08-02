import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['HiringRole'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.HiringRoleCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.hiringRole.create({ data }))
      ),
  })
)

export const createManyHiringRoleMutation = defineMutation((t) => ({
  createManyHiringRole: t.prismaField(createManyHiringRoleMutationObject(t)),
}))
