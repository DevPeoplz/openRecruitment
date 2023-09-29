import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneAuditLogMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AuditLogWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.AuditLogCreateInput, required: true }),
      update: t.field({ type: Inputs.AuditLogUpdateInput, required: true }),
    }))

export const upsertOneAuditLogMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'AuditLog',
    nullable: false,
    args: upsertOneAuditLogMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.auditLog.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneAuditLogMutation = defineMutation((t) => ({
  upsertOneAuditLog: t.prismaField(upsertOneAuditLogMutationObject(t)),
}));
