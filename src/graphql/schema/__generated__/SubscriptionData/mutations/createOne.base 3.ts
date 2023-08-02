import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createOneSubscriptionDataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'SubscriptionData',
      nullable: false,
      args: {
        data: t.arg({
          type: Inputs.SubscriptionDataCreateInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.subscriptionData.create({ data: args.data, ...query }),
    })
)

export const createOneSubscriptionDataMutation = defineMutation((t) => ({
  createOneSubscriptionData: t.prismaField(
    createOneSubscriptionDataMutationObject(t)
  ),
}))
