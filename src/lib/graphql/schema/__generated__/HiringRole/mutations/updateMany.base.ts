import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.HiringRoleWhereInput, required: false }),
      data: t.arg({ type: Inputs.HiringRoleUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.hiringRole.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyHiringRoleMutation = defineMutation((t) => ({
  updateManyHiringRole: t.field(updateManyHiringRoleMutationObject(t)),
}));
