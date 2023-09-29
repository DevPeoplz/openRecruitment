import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyAuditLogQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AuditLogWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AuditLogOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AuditLogWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AuditLogScalarFieldEnum], required: false }),
}))

export const findManyAuditLogQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['AuditLog'],
    nullable: false,
    args: findManyAuditLogQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.auditLog.findMany({
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

export const findManyAuditLogQuery = defineQuery((t) => ({
  findManyAuditLog: t.prismaField(findManyAuditLogQueryObject(t)),
}));
