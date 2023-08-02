import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const updateOneSubscriptionDataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'SubscriptionData',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.SubscriptionDataWhereUniqueInput,
          required: true,
        }),
        data: t.arg({
          type: Inputs.SubscriptionDataUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.subscriptionData.update({
          where: args.where,
          data: args.data,
          ...query,
        }),
    })
)

export const updateOneSubscriptionDataMutation = defineMutation((t) => ({
  updateOneSubscriptionData: t.prismaField(
    updateOneSubscriptionDataMutationObject(t)
  ),
}))
