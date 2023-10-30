import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { builder } from '@/lib/graphql/schema/builder'
import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { Prisma } from '@prisma/client'

const offerCreateInput = builder
  .inputRef<Omit<Prisma.OfferCreateInput, 'company'>>('OfferCreateInputExtended')
  .implement({
    fields: (t) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { company, ...rest } = Inputs.OfferCreateInputFields(t)
      return {
        ...rest,
      }
    },
  })

export const createOneOfferMutationArgs = builder.args((t) => ({
  data: t.field({ type: offerCreateInput, required: true }),
}))

export const createOneOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Offer',
    nullable: false,
    authz: {
      rules: ['IsAuthenticated'],
    },
    args: createOneOfferMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany

      if (!selectedCompany) throw new Error('No company selected')

      let argsCompanyFromSession: typeof args.data & {
        company: Prisma.OfferCreateInput['company']
      } = {
        ...args.data,
        company: {
          connect: {
            id: selectedCompany,
          },
        },
      }

      const pipelineTemplate = await prisma.template.findFirst({
        where: {
          company: {
            id: selectedCompany,
          },
          type: 'PIPELINE',
        },
      })

      if (pipelineTemplate) {
        argsCompanyFromSession = {
          ...argsCompanyFromSession,
          pipelineTemplate: {
            connect: {
              id: pipelineTemplate.id,
            },
          },
        }
      }

      return prisma.offer.create({ data: argsCompanyFromSession, ...query })
    },
  })
)
