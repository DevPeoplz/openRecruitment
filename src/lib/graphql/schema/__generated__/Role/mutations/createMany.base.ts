import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyRoleMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.RoleCreateInput], required: true }) }))

export const createManyRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Role'],
    nullable: false,
    args: createManyRoleMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.role.create({ data }))),
  }),
);

export const createManyRoleMutation = defineMutation((t) => ({
  createManyRole: t.prismaField(createManyRoleMutationObject(t)),
}));
