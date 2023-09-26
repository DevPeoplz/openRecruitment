import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManySubscriptionDataMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.SubscriptionDataWhereInput, required: false }),
      data: t.field({ type: Inputs.SubscriptionDataUpdateManyMutationInput, required: true }),
    }))

export const updateManySubscriptionDataMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManySubscriptionDataMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.subscriptionData.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManySubscriptionDataMutation = defineMutation((t) => ({
  updateManySubscriptionData: t.field(updateManySubscriptionDataMutationObject(t)),
}));
