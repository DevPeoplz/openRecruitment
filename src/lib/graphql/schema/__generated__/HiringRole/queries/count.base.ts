import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countHiringRoleQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.HiringRoleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.HiringRoleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.HiringRoleScalarFieldEnum], required: false }),
}))

export const countHiringRoleQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countHiringRoleQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.hiringRole.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countHiringRoleQuery = defineQuery((t) => ({
  countHiringRole: t.field(countHiringRoleQueryObject(t)),
}));
