import { prisma } from '@/lib/prisma'
import { defineQueryFunction, defineQueryObject } from '@/lib/graphql/schema/__generated__/utils'
import { countOfferQueryArgs } from '@/lib/graphql/schema/__generated__/Offer/queries/count.base'

export const countOfferQueryObject = defineQueryFunction(() =>
  defineQueryObject({
    type: 'Int',
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: countOfferQueryArgs,
    resolve: async (_root, args, _context) => {
      const selectedCompany = _context?.session?.user?.selectedCompany
      const whereCompanyFromSession = {
        AND: {
          ...args.where,
          companyId: selectedCompany,
        },
      }

      return !selectedCompany
        ? 0
        : prisma.offer.count({
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
