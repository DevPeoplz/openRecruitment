import { prisma } from '@/lib/prisma'

import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { deleteOneCandidateMutationArgs } from '@/lib/graphql/schema/__generated__/Candidate/mutations/deleteOne.base'

export const deleteOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: true,
    args: deleteOneCandidateMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany
      if (!selectedCompany) throw new Error('No company selected')

      const argsWhereCompanyFromSession = {
        ...args.where,
        companyId: selectedCompany,
      }

      return prisma.candidate.delete({ where: argsWhereCompanyFromSession, ...query })
    },
  })
)
