import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyAuditLogMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AuditLogWhereInput, required: true }) }))

export const deleteManyAuditLogMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyAuditLogMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.auditLog.deleteMany({ where: args.where }),
  }),
);

export const deleteManyAuditLogMutation = defineMutation((t) => ({
  deleteManyAuditLog: t.field(deleteManyAuditLogMutationObject(t)),
}));
