import { prisma } from '@/lib/prisma'

import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { deleteOneEventMutationArgs } from '@/lib/graphql/schema/__generated__/Event/mutations/deleteOne.base'

export const deleteOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    nullable: true,
    args: deleteOneEventMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany
      if (!selectedCompany) throw new Error('No company selected')

      const argsWhereCompanyFromSession = {
        ...args.where,
        companyId: selectedCompany,
      }

      return prisma.event.delete({ where: argsWhereCompanyFromSession, ...query })
    },
  })
)
