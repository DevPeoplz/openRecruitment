import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneDepartmentMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.DepartmentWhereUniqueInput, required: true }) }))

export const deleteOneDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Department',
    nullable: true,
    args: deleteOneDepartmentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneDepartmentMutation = defineMutation((t) => ({
  deleteOneDepartment: t.prismaField(deleteOneDepartmentMutationObject(t)),
}));
