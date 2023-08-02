import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueCandidateCustomFieldsQueryObject = defineQueryFunction(
  (t) =>
    defineQueryPrismaObject({
      type: 'CandidateCustomFields',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.CandidateCustomFieldsWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.candidateCustomFields.findUnique({
          where: args.where,
          ...query,
        }),
    })
)

export const findUniqueCandidateCustomFieldsQuery = defineQuery((t) => ({
  findUniqueCandidateCustomFields: t.prismaField(
    findUniqueCandidateCustomFieldsQueryObject(t)
  ),
}))
