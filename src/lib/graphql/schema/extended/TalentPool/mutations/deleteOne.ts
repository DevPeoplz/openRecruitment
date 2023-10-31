import { prisma } from '@/lib/prisma'

import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { deleteOneTalentPoolMutationArgs } from '@/lib/graphql/schema/__generated__/TalentPool/mutations/deleteOne.base'

export const deleteOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: true,
    args: deleteOneTalentPoolMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany
      if (!selectedCompany) throw new Error('No company selected')

      const argsWhereCompanyFromSession = {
        ...args.where,
        companyId: selectedCompany,
      }

      return prisma.talentPool.delete({ where: argsWhereCompanyFromSession, ...query })
    },
  })
)
