import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { builder } from '@/lib/graphql/schema/builder'
import { Prisma } from '@prisma/client'
import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'

const eventCreateInput = builder
  .inputRef<Omit<Prisma.EventCreateInput, 'company' | 'createdBy'>>('EventCreateInputExtended')
  .implement({
    fields: (t) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { company, createdBy, ...rest } = Inputs.EventCreateInputFields(t)
      return {
        ...rest,
      }
    },
  })

export const createOneEventMutationArgs = builder.args((t) => ({
  data: t.field({ type: eventCreateInput, required: true }),
}))

export const createOneEventMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Event',
    authz: {
      rules: ['IsAuthenticated'],
    },
    args: createOneEventMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany
      const createdBy: number = _context?.session?.user?.hiringRoleId

      if (!selectedCompany) throw new Error('No company selected')

      const argsCompanyFromSession: typeof args.data & {
        company: Prisma.EventCreateInput['company']
        createdBy: Prisma.EventCreateInput['createdBy']
      } = {
        ...args.data,
        createdBy: {
          connect: {
            id: createdBy,
          },
        },
        company: {
          connect: {
            id: selectedCompany,
          },
        },
      }

      return prisma.event.create({ data: argsCompanyFromSession, ...query })
    },
  })
)
