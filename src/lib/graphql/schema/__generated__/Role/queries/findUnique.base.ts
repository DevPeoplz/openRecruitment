import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueRoleQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.RoleWhereUniqueInput, required: true }) }))

export const findUniqueRoleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Role',
    nullable: true,
    args: findUniqueRoleQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueRoleQuery = defineQuery((t) => ({
  findUniqueRole: t.prismaField(findUniqueRoleQueryObject(t)),
}));
