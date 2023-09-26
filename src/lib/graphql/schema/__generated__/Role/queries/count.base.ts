import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countRoleQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.RoleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.RoleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.RoleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.RoleScalarFieldEnum], required: false }),
}))

export const countRoleQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countRoleQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.role.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countRoleQuery = defineQuery((t) => ({
  countRole: t.field(countRoleQueryObject(t)),
}));
