import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Department',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.DepartmentWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.DepartmentUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.update({
        where: args.where,
        data: args.data,
        ...query,
      }),
  })
)

export const updateOneDepartmentMutation = defineMutation((t) => ({
  updateOneDepartment: t.prismaField(updateOneDepartmentMutationObject(t)),
}))
