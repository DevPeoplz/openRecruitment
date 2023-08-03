import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneAuditLogMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'AuditLog',
    nullable: true,
    args: { where: t.arg({ type: Inputs.AuditLogWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.auditLog.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneAuditLogMutation = defineMutation((t) => ({
  deleteOneAuditLog: t.prismaField(deleteOneAuditLogMutationObject(t)),
}));
