import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findManyCustomFieldQueryArgs } from '@/lib/graphql/schema/__generated__/CustomField/queries/findMany.base'
import { defaultPrismaQueryOptions } from '@/lib/graphql/schema/extended/utils'

export const findManyCustomFieldQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: ['CustomField'],
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: findManyCustomFieldQueryArgs,
    resolve: async (query, _root, args, _context) =>
      await defaultPrismaQueryOptions({
        query,
        context: _context,
        args,
        prisma,
        model: 'CustomField',
        method: 'findMany',
        defaultValue: [],
      }),
  })
)
