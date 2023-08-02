import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const upsertOneSubscriptionDataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'SubscriptionData',
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.SubscriptionDataWhereUniqueInput,
          required: true,
        }),
        create: t.arg({
          type: Inputs.SubscriptionDataCreateInput,
          required: true,
        }),
        update: t.arg({
          type: Inputs.SubscriptionDataUpdateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.subscriptionData.upsert({
          where: args.where,
          create: args.create,
          update: args.update,
          ...query,
        }),
    })
)

export const upsertOneSubscriptionDataMutation = defineMutation((t) => ({
  upsertOneSubscriptionData: t.prismaField(
    upsertOneSubscriptionDataMutationObject(t)
  ),
}))
