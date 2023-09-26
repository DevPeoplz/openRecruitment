import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findManyAuditLogQueryArgs } from '@/lib/graphql/schema/__generated__/AuditLog/queries/findMany.base'

export const findManyAuditLogQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: ['AuditLog'],
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: findManyAuditLogQueryArgs,
    resolve: async (query, _root, args, _context) => {
      const selectedCompany = _context?.session?.user?.selectedCompany
      const permissions = _context?.session?.user?.permissions ?? []

      let whereCompanyFromSession = {
        AND: {
          ...args.where,
          companyId: selectedCompany,
        },
      }

      // TODO: Add the real permission to watch company-wide auditlogs
      if (!permissions.includes('all')) {
        whereCompanyFromSession = {
          AND: {
            ...whereCompanyFromSession.AND,
            userId: _context?.session?.user?.hiringRoleId,
          },
        }
      }

      return !selectedCompany
        ? []
        : await prisma.auditLog.findMany({
            ...query,
            where: whereCompanyFromSession,
            cursor: args.cursor || undefined,
            take: args.take || undefined,
            distinct: args.distinct || undefined,
            skip: args.skip || undefined,
            orderBy: args.orderBy || undefined,
          })
    },
  })
)
