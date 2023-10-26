import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { updateOneCandidateMutationArgs } from '@/lib/graphql/schema/__generated__/Candidate/mutations/updateOne.base'
import { Prisma } from '.prisma/client'

export const updateOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: true,
    args: updateOneCandidateMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany
      if (!selectedCompany) throw new Error('No company selected')

      const argsWhereCompanyFromSession = {
        ...args.where,
        companyId: selectedCompany,
      }

      let argsDataProcessed = args.data

      if (args.data.referrer) {
        const referrer = args.data.referrer
        const referrerId = referrer?.connect?.id
        const isDisconnect = Object.keys(referrer).includes('disconnect')

        if (referrerId) {
          argsDataProcessed = {
            ...argsDataProcessed,
            referrer: {
              connect: {
                id: referrerId,
                companyId: selectedCompany,
              },
            },
          }
        } else if (isDisconnect) {
          argsDataProcessed = {
            ...argsDataProcessed,
            referrer: {
              disconnect: true,
            },
          }
        }
      }

      if (args.data.candidateTags) {
        const candidateTags = args.data.candidateTags

        if (Object.keys(args.data.candidateTags).includes('create')) {
          const create = Array.isArray(args.data.candidateTags.create)
            ? args.data.candidateTags.create
            : []

          argsDataProcessed = {
            ...argsDataProcessed,
            candidateTags: {
              ...candidateTags,
              create: [
                ...(create.map((tag) => {
                  if (!('tag' in tag)) return tag

                  const newTag = tag as Prisma.CandidateTagCreateWithoutCandidateInput

                  const isConnect = Object.keys(newTag.tag).includes('connect')

                  if (isConnect) {
                    return {
                      tag: {
                        ...newTag.tag,
                        connect: {
                          ...newTag.tag.connect,
                          companyId: selectedCompany,
                        },
                      },
                    } as Prisma.CandidateTagCreateWithoutCandidateInput
                  }

                  return newTag
                }) as Prisma.CandidateTagCreateWithoutCandidateInput[]),
              ],
            },
          }
        }
      }

      return prisma.candidate.update({
        where: argsWhereCompanyFromSession,
        data: argsDataProcessed,
        ...query,
      })
    },
  })
)
