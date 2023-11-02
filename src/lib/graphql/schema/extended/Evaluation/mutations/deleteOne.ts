import { prisma } from '@/lib/prisma'

import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { deleteOneEvaluationMutationArgs } from '@/lib/graphql/schema/__generated__/Evaluation/mutations/deleteOne.base'
import { Prisma } from '@prisma/client'

export const deleteOneEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Evaluation',
    nullable: true,
    args: deleteOneEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany
      if (!selectedCompany) throw new Error('No company selected')

      if (!args.where?.id) throw new Error('No evaluation id provided')

      const argsWhereCompanyFromSession = {
        ...args.where,
        candidate: {
          ...args.where?.candidate,
          companyId: {
            equals: selectedCompany,
          },
        },
      } as Prisma.EvaluationWhereUniqueInput

      return prisma.evaluation.delete({ where: argsWhereCompanyFromSession, ...query })
    },
  })
)
