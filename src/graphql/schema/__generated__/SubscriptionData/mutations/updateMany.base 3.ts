import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const updateManySubscriptionDataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: false,
      args: {
        where: t.arg({
          type: Inputs.SubscriptionDataWhereInput,
          required: false,
        }),
        data: t.arg({
          type: Inputs.SubscriptionDataUpdateManyMutationInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.subscriptionData.updateMany({
          where: args.where || undefined,
          data: args.data,
        }),
    })
)

export const updateManySubscriptionDataMutation = defineMutation((t) => ({
  updateManySubscriptionData: t.field(
    updateManySubscriptionDataMutationObject(t)
  ),
}))
