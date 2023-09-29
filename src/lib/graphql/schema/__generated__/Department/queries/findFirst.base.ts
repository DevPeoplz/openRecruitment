import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstDepartmentQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.DepartmentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.DepartmentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.DepartmentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.DepartmentScalarFieldEnum], required: false }),
}))

export const findFirstDepartmentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Department',
    nullable: true,
    args: findFirstDepartmentQueryArgs,
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
  }),
);

export const findFirstDepartmentQuery = defineQuery((t) => ({
  findFirstDepartment: t.prismaField(findFirstDepartmentQueryObject(t)),
}));
