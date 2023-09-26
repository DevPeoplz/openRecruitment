import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyRoleMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.RoleWhereInput, required: true }) }))

export const deleteManyRoleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyRoleMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.role.deleteMany({ where: args.where }),
  }),
);

export const deleteManyRoleMutation = defineMutation((t) => ({
  deleteManyRole: t.field(deleteManyRoleMutationObject(t)),
}));
