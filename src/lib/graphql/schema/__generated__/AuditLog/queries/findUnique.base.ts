import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueAuditLogQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AuditLogWhereUniqueInput, required: true }) }))

export const findUniqueAuditLogQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'AuditLog',
    nullable: true,
    args: findUniqueAuditLogQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.auditLog.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueAuditLogQuery = defineQuery((t) => ({
  findUniqueAuditLog: t.prismaField(findUniqueAuditLogQueryObject(t)),
}));
