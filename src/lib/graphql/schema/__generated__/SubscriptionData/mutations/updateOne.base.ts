import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneSubscriptionDataMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.SubscriptionDataWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.SubscriptionDataUpdateInput, required: true }),
    }))

export const updateOneSubscriptionDataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'SubscriptionData',
    nullable: true,
    args: updateOneSubscriptionDataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.subscriptionData.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneSubscriptionDataMutation = defineMutation((t) => ({
  updateOneSubscriptionData: t.prismaField(updateOneSubscriptionDataMutationObject(t)),
}));
