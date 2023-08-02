import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findManyCandidateCustomFieldsQueryObject = defineQueryFunction(
  (t) =>
    defineQueryPrismaObject({
      type: ['CandidateCustomFields'],
      nullable: false,
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
        await prisma.candidateCustomFields.findMany({
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

export const findManyCandidateCustomFieldsQuery = defineQuery((t) => ({
  findManyCandidateCustomFields: t.prismaField(
    findManyCandidateCustomFieldsQueryObject(t)
  ),
}))
