import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneHiringRoleMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.HiringRoleCreateInput, required: true }),
      update: t.field({ type: Inputs.HiringRoleUpdateInput, required: true }),
    }))

export const upsertOneHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'HiringRole',
    nullable: false,
    args: upsertOneHiringRoleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneHiringRoleMutation = defineMutation((t) => ({
  upsertOneHiringRole: t.prismaField(upsertOneHiringRoleMutationObject(t)),
}));
