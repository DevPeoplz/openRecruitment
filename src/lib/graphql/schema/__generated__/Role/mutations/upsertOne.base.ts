import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneRoleMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.RoleWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.RoleCreateInput, required: true }),
      update: t.field({ type: Inputs.RoleUpdateInput, required: true }),
    }))

export const upsertOneRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Role',
    nullable: false,
    args: upsertOneRoleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneRoleMutation = defineMutation((t) => ({
  upsertOneRole: t.prismaField(upsertOneRoleMutationObject(t)),
}));
