import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueHiringRoleQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: true }) }))

export const findUniqueHiringRoleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'HiringRole',
    nullable: true,
    args: findUniqueHiringRoleQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueHiringRoleQuery = defineQuery((t) => ({
  findUniqueHiringRole: t.prismaField(findUniqueHiringRoleQueryObject(t)),
}));
