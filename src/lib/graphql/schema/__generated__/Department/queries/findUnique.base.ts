import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueDepartmentQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.DepartmentWhereUniqueInput, required: true }) }))

export const findUniqueDepartmentQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Department',
    nullable: true,
    args: findUniqueDepartmentQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueDepartmentQuery = defineQuery((t) => ({
  findUniqueDepartment: t.prismaField(findUniqueDepartmentQueryObject(t)),
}));
