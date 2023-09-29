import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneAuditLogMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AuditLogWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.AuditLogUpdateInput, required: true }),
    }))

export const updateOneAuditLogMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'AuditLog',
    nullable: true,
    args: updateOneAuditLogMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.auditLog.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneAuditLogMutation = defineMutation((t) => ({
  updateOneAuditLog: t.prismaField(updateOneAuditLogMutationObject(t)),
}));
