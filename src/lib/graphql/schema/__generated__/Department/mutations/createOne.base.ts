import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneDepartmentMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.DepartmentCreateInput, required: true }) }))

export const createOneDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Department',
    nullable: false,
    args: createOneDepartmentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.department.create({ data: args.data, ...query }),
  }),
);

export const createOneDepartmentMutation = defineMutation((t) => ({
  createOneDepartment: t.prismaField(createOneDepartmentMutationObject(t)),
}));
