import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findManyTagSourceQueryArgs } from '@/lib/graphql/schema/__generated__/TagSource/queries/findMany.base'
import { defaultPrismaQueryOptions } from '@/lib/graphql/schema/extended/utils'

export const findManyTagSourceQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: ['TagSource'],
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: findManyTagSourceQueryArgs,
    resolve: async (query, _root, args, _context) =>
      await defaultPrismaQueryOptions({
        query,
        context: _context,
        args,
        prisma,
        model: 'tagSource',
        method: 'findMany',
        defaultValue: [],
      }),
  })
)
