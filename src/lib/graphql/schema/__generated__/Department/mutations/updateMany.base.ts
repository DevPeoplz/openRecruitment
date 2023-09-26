import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyDepartmentMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.DepartmentWhereInput, required: false }),
      data: t.field({ type: Inputs.DepartmentUpdateManyMutationInput, required: true }),
    }))

export const updateManyDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyDepartmentMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.department.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyDepartmentMutation = defineMutation((t) => ({
  updateManyDepartment: t.field(updateManyDepartmentMutationObject(t)),
}));
