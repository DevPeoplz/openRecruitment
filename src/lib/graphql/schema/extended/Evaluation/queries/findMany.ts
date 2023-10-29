import { prisma } from '@/lib/prisma'
import {
  defineQueryFunction,
  defineQueryPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { findManyEvaluationQueryArgs } from '@/lib/graphql/schema/__generated__/Evaluation/queries/findMany.base'

export const findManyEvaluationQueryObject = defineQueryFunction(() =>
  defineQueryPrismaObject({
    type: ['Evaluation'],
    authz: {
      rules: ['IsAuthenticated'],
    },
    nullable: false,
    args: findManyEvaluationQueryArgs,
    resolve: async (query, _root, args, _context) => {
      const selectedCompany = _context?.session?.user?.selectedCompany

      return !selectedCompany
        ? []
        : await prisma.evaluation.findMany({
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
