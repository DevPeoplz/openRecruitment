import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Department',
    nullable: false,
    args: {
      data: t.arg({ type: Inputs.DepartmentCreateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.create({ data: args.data, ...query }),
  })
)

export const createOneDepartmentMutation = defineMutation((t) => ({
  createOneDepartment: t.prismaField(createOneDepartmentMutationObject(t)),
}))
