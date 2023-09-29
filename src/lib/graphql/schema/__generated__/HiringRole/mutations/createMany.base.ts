import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyHiringRoleMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.HiringRoleCreateInput], required: true }) }))

export const createManyHiringRoleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['HiringRole'],
    nullable: false,
    args: createManyHiringRoleMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.hiringRole.create({ data }))),
  }),
);

export const createManyHiringRoleMutation = defineMutation((t) => ({
  createManyHiringRole: t.prismaField(createManyHiringRoleMutationObject(t)),
}));
