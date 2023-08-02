import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Department'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.DepartmentCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.department.create({ data }))
      ),
  })
)

export const createManyDepartmentMutation = defineMutation((t) => ({
  createManyDepartment: t.prismaField(createManyDepartmentMutationObject(t)),
}))
