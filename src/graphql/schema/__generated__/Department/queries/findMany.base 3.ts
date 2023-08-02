import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyDepartmentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Department'],
    nullable: false,
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
      await prisma.department.findMany({
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

export const findManyDepartmentQuery = defineQuery((t) => ({
  findManyDepartment: t.prismaField(findManyDepartmentQueryObject(t)),
}))
