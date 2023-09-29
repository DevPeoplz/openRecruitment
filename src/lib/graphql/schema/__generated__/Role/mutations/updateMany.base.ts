import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyRoleMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.RoleWhereInput, required: false }),
      data: t.field({ type: Inputs.RoleUpdateManyMutationInput, required: true }),
    }))

export const updateManyRoleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyRoleMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.role.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyRoleMutation = defineMutation((t) => ({
  updateManyRole: t.field(updateManyRoleMutationObject(t)),
}));
