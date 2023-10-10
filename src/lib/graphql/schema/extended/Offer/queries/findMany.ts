import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findManyOfferQueryArgs } from '@/lib/graphql/schema/__generated__/Offer/queries/findMany.base'
import { defaultPrismaQueryOptions } from '@/lib/graphql/schema/extended/utils'

export const findManyOfferQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: ['Offer'],
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: findManyOfferQueryArgs,
    resolve: async (query, _root, args, _context) =>
      await defaultPrismaQueryOptions({
        query,
        context: _context,
        args,
        prisma,
        model: 'offer',
        method: 'findMany',
        defaultValue: [],
      }),
  })
)
