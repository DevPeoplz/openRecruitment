import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneRoleMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.RoleCreateInput, required: true }) }))

export const createOneRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Role',
    nullable: false,
    args: createOneRoleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.create({ data: args.data, ...query }),
  }),
);

export const createOneRoleMutation = defineMutation((t) => ({
  createOneRole: t.prismaField(createOneRoleMutationObject(t)),
}));
