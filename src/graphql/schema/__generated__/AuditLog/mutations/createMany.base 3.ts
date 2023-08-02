import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManyAuditLogMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['AuditLog'],
    nullable: false,
    args: {
      data: t.arg({ type: [Inputs.AuditLogCreateInput], required: true }),
    },
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(
        args.data.map((data) => prisma.auditLog.create({ data }))
      ),
  })
)

export const createManyAuditLogMutation = defineMutation((t) => ({
  createManyAuditLog: t.prismaField(createManyAuditLogMutationObject(t)),
}))
