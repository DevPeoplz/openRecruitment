import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstCandidateCustomFieldsQueryObject = defineQueryFunction(
  (t) =>
    defineQueryPrismaObject({
      type: 'CandidateCustomFields',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.CandidateCustomFieldsWhereInput,
          required: false,
        }),
        orderBy: t.arg({
          type: [Inputs.CandidateCustomFieldsOrderByWithRelationInput],
          required: false,
        }),
        cursor: t.arg({
          type: Inputs.CandidateCustomFieldsWhereUniqueInput,
          required: false,
        }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({
          type: [Inputs.CandidateCustomFieldsScalarFieldEnum],
          required: false,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.candidateCustomFields.findFirst({
          where: args.where || undefined,
          cursor: args.cursor || undefined,
          take: args.take || undefined,
          distinct: args.distinct || undefined,
          skip: args.skip || undefined,
          orderBy: args.orderBy || undefined,
          ...query,
        }),
    })
)

export const findFirstCandidateCustomFieldsQuery = defineQuery((t) => ({
  findFirstCandidateCustomFields: t.prismaField(
    findFirstCandidateCustomFieldsQueryObject(t)
  ),
}))
