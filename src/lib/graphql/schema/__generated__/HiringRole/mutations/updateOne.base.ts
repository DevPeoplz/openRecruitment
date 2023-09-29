import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneHiringRoleMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.HiringRoleUpdateInput, required: true }),
    }))

export const updateOneHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'HiringRole',
    nullable: true,
    args: updateOneHiringRoleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneHiringRoleMutation = defineMutation((t) => ({
  updateOneHiringRole: t.prismaField(updateOneHiringRoleMutationObject(t)),
}));
