import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countDepartmentQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.DepartmentWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.DepartmentOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.DepartmentWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.DepartmentScalarFieldEnum], required: false }),
}))

export const countDepartmentQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countDepartmentQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.department.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countDepartmentQuery = defineQuery((t) => ({
  countDepartment: t.field(countDepartmentQueryObject(t)),
}));
