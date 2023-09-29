import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneRoleMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.RoleWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.RoleUpdateInput, required: true }),
    }))

export const updateOneRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Role',
    nullable: true,
    args: updateOneRoleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneRoleMutation = defineMutation((t) => ({
  updateOneRole: t.prismaField(updateOneRoleMutationObject(t)),
}));
