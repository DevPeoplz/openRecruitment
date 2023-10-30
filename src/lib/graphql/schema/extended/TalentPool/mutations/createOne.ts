import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { builder } from '@/lib/graphql/schema/builder'
import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { Prisma } from '@prisma/client'

const talentPoolCreateInput = builder
  .inputRef<Omit<Prisma.TalentPoolCreateInput, 'company'>>('TalentPoolCreateInputExtended')
  .implement({
    fields: (t) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { company, ...rest } = Inputs.TalentPoolCreateInputFields(t)
      return {
        ...rest,
      }
    },
  })

export const createOneTalentPoolMutationArgs = builder.args((t) => ({
  data: t.field({ type: talentPoolCreateInput, required: true }),
}))

export const createOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: false,
    authz: {
      rules: ['IsAuthenticated'],
    },
    args: createOneTalentPoolMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany

      if (!selectedCompany) throw new Error('No company selected')

      const argsCompanyFromSession: typeof args.data & {
        company: Prisma.TalentPoolCreateInput['company']
      } = {
        ...args.data,
        company: {
          connect: {
            id: selectedCompany,
          },
        },
      }

      return prisma.talentPool.create({ data: argsCompanyFromSession, ...query })
    },
  })
)
