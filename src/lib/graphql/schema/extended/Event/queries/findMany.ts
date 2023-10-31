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
      const selectedCompany = _context?.session?.user?.selectedCompany

      return !selectedCompany
        ? []
        : await prisma.event.findMany({
            ...query,
            where: args.where || undefined,
            cursor: args.cursor || undefined,
            take: args.take || undefined,
            distinct: args.distinct || undefined,
            skip: args.skip || undefined,
            orderBy: args.orderBy || undefined,
          })
    },
  })
)
