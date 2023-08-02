import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Department',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.DepartmentWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.delete({ where: args.where, ...query }),
  })
)

export const deleteOneDepartmentMutation = defineMutation((t) => ({
  deleteOneDepartment: t.prismaField(deleteOneDepartmentMutationObject(t)),
}))
