import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { builder } from '@/lib/graphql/schema/builder'
import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { Prisma } from '@prisma/client'

const candidateCreateInput = builder
  .inputRef<Omit<Prisma.CandidateCreateInput, 'company'>>('CandidateCreateInputExtended')
  .implement({
    fields: (t) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { company, ...rest } = Inputs.CandidateCreateInputFields(t)
      return { ...rest }
    },
  })

export const createOneCandidateMutationArgs = builder.args((t) => ({
  data: t.field({ type: candidateCreateInput, required: true }),
}))

export const createOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: false,
    args: createOneCandidateMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany = _context?.session?.user?.selectedCompany
      const argsCompanyFromSession = {
        ...args.data,
        companyId: selectedCompany,
      }

      return prisma.candidate.create({ data: argsCompanyFromSession, ...query })
    },
  })
)
