import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyHiringRoleMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.HiringRoleWhereInput, required: false }),
      data: t.field({ type: Inputs.HiringRoleUpdateManyMutationInput, required: true }),
    }))

export const updateManyHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyHiringRoleMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.hiringRole.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyHiringRoleMutation = defineMutation((t) => ({
  updateManyHiringRole: t.field(updateManyHiringRoleMutationObject(t)),
}));
