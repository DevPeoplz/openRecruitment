import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyRoleQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.RoleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.RoleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.RoleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.RoleScalarFieldEnum], required: false }),
}))

export const findManyRoleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Role'],
    nullable: false,
    args: findManyRoleQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.role.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findManyRoleQuery = defineQuery((t) => ({
  findManyRole: t.prismaField(findManyRoleQueryObject(t)),
}));
