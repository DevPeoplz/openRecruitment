import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findManyEventQueryArgs } from '@/lib/graphql/schema/__generated__/Event/queries/findMany.base'

export const findManyEventQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: ['Event'],
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: findManyEventQueryArgs,
    resolve: async (query, _root, args, _context) => {
      const { userRole, selectedCompany, hiringRoleId } = _context?.session?.user || {}

      if (!selectedCompany) throw new Error('No company selected')

      let whereExtended = args.where

      // TODO: if (userRole !== 'SUPERADMIN') {
      whereExtended = {
        AND: [
          {
            OR: [
              {
                createdById: hiringRoleId,
              },
              {
                interviewers: {
                  some: {
                    id: hiringRoleId,
                  },
                },
              },
            ],
          },
          { ...whereExtended },
        ],
      }

      whereExtended = {
        AND: {
          ...whereExtended,
          companyId: selectedCompany,
        },
      }

      return prisma.event.findMany({
        ...query,
        where: whereExtended,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })
    },
  })
)
