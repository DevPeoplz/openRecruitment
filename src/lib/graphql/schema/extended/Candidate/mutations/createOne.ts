import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { builder } from '@/lib/graphql/schema/builder'
import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { Prisma } from '@prisma/client'
import { omit } from 'lodash'

const candidateCreateInput = builder
  .inputRef<
    Omit<Prisma.CandidateCreateInput, 'company'> & {
      jobsInput?: string[]
      tagsInput?: string[]
      sourcesInput?: string[]
    }
  >('CandidateCreateInputExtended')
  .implement({
    fields: (t) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { company, ...rest } = Inputs.CandidateCreateInputFields(t)
      return {
        ...rest,
        jobsInput: t.field({ required: false, type: ['String'] }),
        tagsInput: t.field({ required: false, type: ['String'] }),
        sourcesInput: t.field({ required: false, type: ['String'] }),
      }
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
      const selectedCompany: string = _context?.session?.user?.selectedCompany

      if (!selectedCompany) throw new Error('No company selected')

      const relations = {
        jobsInput: null,
        tagsInput: { candidateRelation: 'candidateTags', entityId: 'tagId' },
        sourcesInput: { candidateRelation: 'candidateTags', entityId: 'tagId' },
      }

      let argsCompanyFromSession: typeof args.data & {
        company: Prisma.CandidateCreateInput['company']
      } = {
        ...(omit(args.data, Object.keys(relations)) as typeof args.data),
        company: {
          connect: {
            id: selectedCompany,
          },
        },
      }

      if (args.data.tagsInput && args.data.tagsInput.length > 0) {
        argsCompanyFromSession = {
          ...argsCompanyFromSession,
          candidateTags: {
            createMany: {
              data: args.data.tagsInput.map((item) => {
                return {
                  tagId: parseInt(item),
                }
              }),
            },
          },
        }
      }

      if (args.data.sourcesInput && args.data.sourcesInput.length > 0) {
        argsCompanyFromSession = {
          ...argsCompanyFromSession,
          referrer: {
            connect: {
              id: parseInt(args.data.sourcesInput[0]),
            },
          },
        }
      }

      if (args.data.jobsInput && args.data.jobsInput.length > 0) {
        const offers = []
        const talentPools = []
        const suffix = ' (Talent Pool)'

        for (const job of args.data.jobsInput) {
          if (job.includes(suffix)) {
            talentPools.push(parseInt(job.replace(suffix, '')))
          } else {
            offers.push(parseInt(job))
          }
        }

        argsCompanyFromSession = {
          ...argsCompanyFromSession,
          ...(offers.length > 0
            ? {
                offers: {
                  createMany: {
                    data: offers.map((offer) => ({ offerId: offer })),
                  },
                },
              }
            : {}),
          ...(talentPools.length > 0
            ? {
                talentPools: {
                  createMany: {
                    data: talentPools.map((tp) => ({ talentPoolId: tp })),
                  },
                },
              }
            : {}),
        }
      }

      return prisma.candidate.create({ data: argsCompanyFromSession, ...query })
    },
  })
)
