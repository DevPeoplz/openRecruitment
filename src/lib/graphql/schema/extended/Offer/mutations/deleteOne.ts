import { prisma } from '@/lib/prisma'

import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { deleteOneOfferMutationArgs } from '@/lib/graphql/schema/__generated__/Offer/mutations/deleteOne.base'

export const deleteOneOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Offer',
    nullable: true,
    args: deleteOneOfferMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany
      if (!selectedCompany) throw new Error('No company selected')

      const argsWhereCompanyFromSession = {
        ...args.where,
        companyId: selectedCompany,
      }

      return prisma.offer.delete({ where: argsWhereCompanyFromSession, ...query })
    },
  })
)
