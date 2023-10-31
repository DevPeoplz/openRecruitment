import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { createOneEventMutationArgs } from '@/lib/graphql/schema/__generated__/Event/mutations/createOne.base'

export const createOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    authz: {
      rules: ['IsAuthenticated'],
    },
    args: createOneEventMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany

      if (!selectedCompany) throw new Error('No company selected')

      return prisma.event.create({ data: args.data, ...query })
    },
  })
)
