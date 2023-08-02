import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findFirstSubscriptionDataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'SubscriptionData',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.SubscriptionDataWhereInput,
        required: false,
      }),
      orderBy: t.arg({
        type: [Inputs.SubscriptionDataOrderByWithRelationInput],
        required: false,
      }),
      cursor: t.arg({
        type: Inputs.SubscriptionDataWhereUniqueInput,
        required: false,
      }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({
        type: [Inputs.SubscriptionDataScalarFieldEnum],
        required: false,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.subscriptionData.findFirst({
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

export const findFirstSubscriptionDataQuery = defineQuery((t) => ({
  findFirstSubscriptionData: t.prismaField(
    findFirstSubscriptionDataQueryObject(t)
  ),
}))
