import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneHiringRoleMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: true }) }))

export const deleteOneHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'HiringRole',
    nullable: true,
    args: deleteOneHiringRoleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneHiringRoleMutation = defineMutation((t) => ({
  deleteOneHiringRole: t.prismaField(deleteOneHiringRoleMutationObject(t)),
}));
