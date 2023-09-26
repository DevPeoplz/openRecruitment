import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneAuditLogMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.AuditLogCreateInput, required: true }) }))

export const createOneAuditLogMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'AuditLog',
    nullable: false,
    args: createOneAuditLogMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.auditLog.create({ data: args.data, ...query }),
  }),
);

export const createOneAuditLogMutation = defineMutation((t) => ({
  createOneAuditLog: t.prismaField(createOneAuditLogMutationObject(t)),
}));
