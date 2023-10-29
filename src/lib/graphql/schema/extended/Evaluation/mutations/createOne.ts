import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { createOneEvaluationMutationArgs } from '@/lib/graphql/schema/__generated__/Evaluation/mutations/createOne.base'

export const createOneEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Evaluation',
    authz: {
      rules: ['IsAuthenticated'],
    },
    args: createOneEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany

      if (!selectedCompany) throw new Error('No company selected')

      return prisma.evaluation.create({ data: args.data, ...query })
    },
  })
)
