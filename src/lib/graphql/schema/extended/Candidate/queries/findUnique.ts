import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findUniqueCandidateQueryArgs } from '@/lib/graphql/schema/__generated__/Candidate/queries/findUnique.base'
import { defaultPrismaQueryOptions } from '@/lib/graphql/schema/extended/utils'

export const findUniqueCandidateQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: 'Candidate',
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: true,
    args: findUniqueCandidateQueryArgs,
    resolve: async (query, _root, args, _context) =>
      await defaultPrismaQueryOptions({
        query,
        context: _context,
        args,
        prisma,
        model: 'candidate',
        method: 'findUnique',
        defaultValue: {},
      }),
  })
)
