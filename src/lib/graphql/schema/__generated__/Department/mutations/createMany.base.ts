import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyDepartmentMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.DepartmentCreateInput], required: true }) }))

export const createManyDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Department'],
    nullable: false,
    args: createManyDepartmentMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.department.create({ data }))),
  }),
);

export const createManyDepartmentMutation = defineMutation((t) => ({
  createManyDepartment: t.prismaField(createManyDepartmentMutationObject(t)),
}));
