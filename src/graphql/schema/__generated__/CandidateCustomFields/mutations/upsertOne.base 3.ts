import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneCandidateCustomFieldsMutationObject =
  defineMutationFunction((t) =>
    defineMutationPrismaObject({
      type: 'CandidateCustomFields',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.CandidateCustomFieldsWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.CandidateCustomFieldsCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.CandidateCustomFieldsUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.candidateCustomFields.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
  )

export const upsertOneCandidateCustomFieldsMutation = defineMutation((t) => ({
  upsertOneCandidateCustomFields: t.prismaField(
    upsertOneCandidateCustomFieldsMutationObject(t)
  ),
}))
