import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const createManySubscriptionDataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: ['SubscriptionData'],
      nullable: false,
      args: {
        data: t.arg({
          type: [Inputs.SubscriptionDataCreateInput],
          required: true,
        }),
      },
      resolve: async (_query, _root, args, _context, _info) =>
        await prisma.$transaction(
          args.data.map((data) => prisma.subscriptionData.create({ data }))
        ),
    })
)

export const createManySubscriptionDataMutation = defineMutation((t) => ({
  createManySubscriptionData: t.prismaField(
    createManySubscriptionDataMutationObject(t)
  ),
}))
