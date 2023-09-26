import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findManyCandidateQueryArgs } from '@/lib/graphql/schema/__generated__/Candidate/queries/findMany.base'
import { defaultPrismaQueryOptions } from '@/lib/graphql/schema/extended/utils'

export const findManyCandidateQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: ['Candidate'],
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: findManyCandidateQueryArgs,
    resolve: async (query, _root, args, _context) =>
      await defaultPrismaQueryOptions({
        query,
        context: _context,
        args,
        prisma,
        model: 'candidate',
        method: 'findMany',
        defaultValue: [],
      }),
  })
)
