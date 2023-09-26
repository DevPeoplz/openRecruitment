import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneSubscriptionDataMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.SubscriptionDataCreateInput, required: true }) }))

export const createOneSubscriptionDataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'SubscriptionData',
    nullable: false,
    args: createOneSubscriptionDataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.subscriptionData.create({ data: args.data, ...query }),
  }),
);

export const createOneSubscriptionDataMutation = defineMutation((t) => ({
  createOneSubscriptionData: t.prismaField(createOneSubscriptionDataMutationObject(t)),
}));
