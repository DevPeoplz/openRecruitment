import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyHiringRoleMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.HiringRoleWhereInput, required: true }) }))

export const deleteManyHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyHiringRoleMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.hiringRole.deleteMany({ where: args.where }),
  }),
);

export const deleteManyHiringRoleMutation = defineMutation((t) => ({
  deleteManyHiringRole: t.field(deleteManyHiringRoleMutationObject(t)),
}));
