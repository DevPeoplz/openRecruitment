import { prisma } from '@/lib/prisma'
import {
  defineMutationFunction,
  defineMutationPrismaObject,
} from '@/lib/graphql/schema/__generated__/utils'
import { updateOneCandidateMutationArgs } from '@/lib/graphql/schema/__generated__/Candidate/mutations/updateOne.base'
import { Prisma } from '.prisma/client'
import { omit } from 'lodash'
import sanitizeHtml from 'sanitize-html'

export const updateOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: true,
    authz: {
      rules: ['IsAuthenticated'],
    },
    args: updateOneCandidateMutationArgs,
    resolve: async (query, _root, args, _context, _info) => {
      const selectedCompany: string = _context?.session?.user?.selectedCompany
      if (!selectedCompany) throw new Error('No company selected')

      const argsWhereCompanyFromSession = {
        ...args.where,
        companyId: selectedCompany,
      }

      const candidateId = args.where.id

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

      if (args.data.candidateCustomFields) {
        const candidateCustomFields = args.data.candidateCustomFields
        const candidateCFKeys = Object.keys(args.data.candidateCustomFields)

        if (candidateCFKeys.includes('upsert')) {
          const upsert = Array.isArray(candidateCustomFields.upsert)
            ? candidateCustomFields.upsert
            : []

          argsDataProcessed = {
            ...argsDataProcessed,
            candidateCustomFields: {
              ...(upsert.length > 0
                ? {
                    upsert: [
                      ...(upsert
                        .map((candidateCF) => {
                          const newCFId = (
                            candidateCF.where
                              .customFieldId as Prisma.IntFilter<'CandidateCustomField'>
                          )?.equals

                          if (newCFId) {
                            return {
                              where: {
                                customField: {
                                  id: newCFId,
                                  companyId: selectedCompany,
                                },
                                candidateId_customFieldId: {
                                  candidateId: candidateId,
                                  customFieldId: newCFId,
                                },
                              },
                              update: {
                                value: (
                                  candidateCF.update
                                    ?.value as Prisma.NullableStringFieldUpdateOperationsInput
                                )?.set,
                              },
                              create: {
                                customField: {
                                  connect: {
                                    id: newCFId,
                                    companyId: {
                                      equals: selectedCompany,
                                    },
                                  },
                                },
                                value: candidateCF.create?.value,
                              },
                            }
                          }

                          return null
                        })
                        .filter(
                          (e) => e
                        ) as Prisma.CandidateCustomFieldUpsertWithWhereUniqueWithoutCandidateInput[]),
                    ],
                  }
                : {}),
            },
          }
        }
      }

      if (args.data.offers) {
        const candidateOffers = args.data.offers
        const candidateOfferKeys = Object.keys(candidateOffers)

        if (candidateOfferKeys.includes('update')) {
          const update = Array.isArray(candidateOffers.update) ? candidateOffers.update : []

          argsDataProcessed = {
            ...argsDataProcessed,
            offers: {
              ...(update.length > 0
                ? {
                    update: [
                      ...(update
                        .map((candidateOffer) => {
                          const newMatchId = candidateOffer.where.id
                          const offerId = (
                            candidateOffer.where.offer?.id as Prisma.IntFilter<'Match'>
                          )?.equals
                          const stageId = candidateOffer?.data.stage?.connect?.id

                          if (offerId && stageId) {
                            return {
                              where: {
                                id: newMatchId,
                                offer: {
                                  id: { equals: offerId },
                                  companyId: {
                                    equals: selectedCompany,
                                  },
                                },
                              },
                              data: {
                                stage: {
                                  connect: {
                                    id: stageId,
                                    template: {
                                      companyId: {
                                        equals: selectedCompany,
                                      },
                                      pipelineTemplate: {
                                        some: {
                                          id: {
                                            equals: offerId,
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            }
                          }

                          return null
                        })
                        .filter(
                          (e) => e
                        ) as Prisma.MatchUpdateWithWhereUniqueWithoutCandidateInput[]),
                    ],
                  }
                : {}),
            },
          }
        }
      }

      if (args.data.evaluations) {
        const candidateEvaluations = args.data.evaluations
        const candidateEvaluationKeys = Object.keys(candidateEvaluations)
        const hiringRoleId = _context?.session?.user?.hiringRoleId

        if (candidateEvaluationKeys.includes('create') && hiringRoleId) {
          const create = Array.isArray(candidateEvaluations.create)
            ? candidateEvaluations.create
            : []

          argsDataProcessed = {
            ...argsDataProcessed,
            evaluations: {
              ...(create.length > 0
                ? {
                    create: [
                      ...create.map((candidateEvaluation) => {
                        return {
                          ...candidateEvaluation,
                          description: candidateEvaluation.description
                            ? sanitizeHtml(candidateEvaluation.description)
                            : null,
                          isQuickEval: true,
                          teamMember: {
                            connect: {
                              id: hiringRoleId,
                              companyId: {
                                equals: selectedCompany,
                              },
                            },
                          },
                        }
                      }),
                    ],
                  }
                : {}),
            },
          }
        } else {
          argsDataProcessed = omit(argsDataProcessed, ['evaluations'])
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
