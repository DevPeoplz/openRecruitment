import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneDepartmentMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.DepartmentWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.DepartmentUpdateInput, required: true }),
    }))

export const updateOneDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Department',
    nullable: true,
    args: updateOneDepartmentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneDepartmentMutation = defineMutation((t) => ({
  updateOneDepartment: t.prismaField(updateOneDepartmentMutationObject(t)),
}));
