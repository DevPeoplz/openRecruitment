import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyDepartmentMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.DepartmentWhereInput, required: true }) }))

export const deleteManyDepartmentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyDepartmentMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.department.deleteMany({ where: args.where }),
  }),
);

export const deleteManyDepartmentMutation = defineMutation((t) => ({
  deleteManyDepartment: t.field(deleteManyDepartmentMutationObject(t)),
}));
