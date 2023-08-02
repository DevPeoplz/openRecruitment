import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Role'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.RoleCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.role.create({ data }))
      ),
  })
)

export const createManyRoleMutation = defineMutation((t) => ({
  createManyRole: t.prismaField(createManyRoleMutationObject(t)),
}))
