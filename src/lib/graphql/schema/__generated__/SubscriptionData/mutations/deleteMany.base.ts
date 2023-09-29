import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManySubscriptionDataMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.SubscriptionDataWhereInput, required: true }) }))

export const deleteManySubscriptionDataMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManySubscriptionDataMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.subscriptionData.deleteMany({ where: args.where }),
  }),
);

export const deleteManySubscriptionDataMutation = defineMutation((t) => ({
  deleteManySubscriptionData: t.field(deleteManySubscriptionDataMutationObject(t)),
}));
