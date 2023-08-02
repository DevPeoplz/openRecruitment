import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueDepartmentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Department',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.DepartmentWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueDepartmentQuery = defineQuery((t) => ({
  findUniqueDepartment: t.prismaField(findUniqueDepartmentQueryObject(t)),
}))
