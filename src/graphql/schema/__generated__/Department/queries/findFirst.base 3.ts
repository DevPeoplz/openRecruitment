import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstDepartmentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Department',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.DepartmentWhereInput, required: false }),
      orderBy: t.arg({
        type: [Inputs.DepartmentOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.DepartmentWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.DepartmentScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  })
)

export const findFirstDepartmentQuery = defineQuery((t) => ({
  findFirstDepartment: t.prismaField(findFirstDepartmentQueryObject(t)),
}))
