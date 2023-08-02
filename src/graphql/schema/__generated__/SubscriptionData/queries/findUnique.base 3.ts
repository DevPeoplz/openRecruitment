import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineQuery,
  defineQueryFunction,
  defineQueryPrismaObject,
} from '../../utils'

export const findUniqueSubscriptionDataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'SubscriptionData',
    nullable: true,
    args: {
      where: t.arg({
        type: Inputs.SubscriptionDataWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.subscriptionData.findUnique({ where: args.where, ...query }),
  })
)

export const findUniqueSubscriptionDataQuery = defineQuery((t) => ({
  findUniqueSubscriptionData: t.prismaField(
    findUniqueSubscriptionDataQueryObject(t)
  ),
}))
