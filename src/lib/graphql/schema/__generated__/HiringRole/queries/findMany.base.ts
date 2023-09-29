import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyHiringRoleQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.HiringRoleWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.HiringRoleOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.HiringRoleWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.HiringRoleScalarFieldEnum], required: false }),
}))

export const findManyHiringRoleQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['HiringRole'],
    nullable: false,
    args: findManyHiringRoleQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.hiringRole.findMany({
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

export const findManyHiringRoleQuery = defineQuery((t) => ({
  findManyHiringRole: t.prismaField(findManyHiringRoleQueryObject(t)),
}));
