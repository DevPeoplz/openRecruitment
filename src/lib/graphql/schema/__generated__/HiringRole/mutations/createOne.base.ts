import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneHiringRoleMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.HiringRoleCreateInput, required: true }) }))

export const createOneHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'HiringRole',
    nullable: false,
    args: createOneHiringRoleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.create({ data: args.data, ...query }),
  }),
);

export const createOneHiringRoleMutation = defineMutation((t) => ({
  createOneHiringRole: t.prismaField(createOneHiringRoleMutationObject(t)),
}));
