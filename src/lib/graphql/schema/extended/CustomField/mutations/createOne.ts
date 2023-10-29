import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { builder } from '@/lib/graphql/schema/builder'
import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { Prisma } from '@prisma/client'
import { omit } from 'lodash'

const customFieldCreateInput = builder
  .inputRef<Omit<Prisma.CustomFieldCreateInput, 'company'>>('CustomFieldCreateInputExtended')
  .implement({
    fields: (t) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { company, ...rest } = Inputs.CustomFieldCreateInputFields(t)
      return {
        ...rest,
      }
    },
  })

export const createOneCustomFieldMutationArgs = builder.args((t) => ({
  data: t.field({ type: customFieldCreateInput, required: true }),
}))

export const createOneCustomFieldMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CustomField',
    nullable: false,
    args: createOneCustomFieldMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany

      if (!selectedCompany) throw new Error('No company selected')

      const argsCompanyFromSession: typeof args.data & {
        company: Prisma.CandidateCreateInput['company']
      } = {
        ...args.data,
        company: {
          connect: {
            id: selectedCompany,
          },
        },
      }

      return prisma.customField.create({ data: argsCompanyFromSession, ...query })
    },
  })
)
