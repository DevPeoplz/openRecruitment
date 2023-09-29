import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyAuditLogMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.AuditLogCreateInput], required: true }) }))

export const createManyAuditLogMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['AuditLog'],
    nullable: false,
    args: createManyAuditLogMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.auditLog.create({ data }))),
  }),
);

export const createManyAuditLogMutation = defineMutation((t) => ({
  createManyAuditLog: t.prismaField(createManyAuditLogMutationObject(t)),
}));
