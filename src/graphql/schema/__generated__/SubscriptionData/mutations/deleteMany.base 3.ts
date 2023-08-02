import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationObject,
} from '../../utils'

export const deleteManySubscriptionDataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationObject({
      type: BatchPayload,
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.SubscriptionDataWhereInput,
          required: true,
        }),
      },
      resolve: async (_root, args, _context, _info) =>
        await prisma.subscriptionData.deleteMany({ where: args.where }),
    })
)

export const deleteManySubscriptionDataMutation = defineMutation((t) => ({
  deleteManySubscriptionData: t.field(
    deleteManySubscriptionDataMutationObject(t)
  ),
}))
