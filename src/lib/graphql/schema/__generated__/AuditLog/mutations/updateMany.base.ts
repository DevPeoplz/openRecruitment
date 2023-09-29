import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyAuditLogMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AuditLogWhereInput, required: false }),
      data: t.field({ type: Inputs.AuditLogUpdateManyMutationInput, required: true }),
    }))

export const updateManyAuditLogMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyAuditLogMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.auditLog.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyAuditLogMutation = defineMutation((t) => ({
  updateManyAuditLog: t.field(updateManyAuditLogMutationObject(t)),
}));
