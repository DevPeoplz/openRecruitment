import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma'
import {
  defineMutation,
  defineMutationFunction,
  defineMutationPrismaObject,
} from '../../utils'

export const deleteOneSubscriptionDataMutationObject = defineMutationFunction(
  (t) =>
    defineMutationPrismaObject({
      type: 'SubscriptionData',
      nullable: true,
      args: {
        where: t.arg({
          type: Inputs.SubscriptionDataWhereUniqueInput,
          required: true,
        }),
      },
      resolve: async (query, _root, args, _context, _info) =>
        await prisma.subscriptionData.delete({ where: args.where, ...query }),
    })
)

export const deleteOneSubscriptionDataMutation = defineMutation((t) => ({
  deleteOneSubscriptionData: t.prismaField(
    deleteOneSubscriptionDataMutationObject(t)
  ),
}))
