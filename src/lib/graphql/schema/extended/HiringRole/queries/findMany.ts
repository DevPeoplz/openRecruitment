import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findManyHiringRoleQueryArgs } from '@/lib/graphql/schema/__generated__/HiringRole/queries/findMany.base'

export const findManyHiringRoleQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: ['HiringRole'],
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: findManyHiringRoleQueryArgs,
    resolve: async (query, _root, args, _context) => {
      const selectedCompany = _context?.session?.user?.selectedCompany

      const whereCompanyFromSession = {
        AND: {
          ...args.where,
          companyId: selectedCompany,
        },
      }

      return !selectedCompany
        ? []
        : await prisma.hiringRole.findMany({
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
