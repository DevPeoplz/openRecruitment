import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findManyTalentPoolQueryArgs } from '@/lib/graphql/schema/__generated__/TalentPool/queries/findMany.base'
import { defaultPrismaQueryOptions } from '@/lib/graphql/schema/extended/utils'

export const findManyTalentPoolQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: ['TalentPool'],
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: findManyTalentPoolQueryArgs,
    resolve: async (query, _root, args, _context) =>
      await defaultPrismaQueryOptions({
        query,
        context: _context,
        args,
        prisma,
        model: 'talentPool',
        method: 'findMany',
        defaultValue: [],
      }),
  })
)
