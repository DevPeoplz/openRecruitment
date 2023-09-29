import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneSubscriptionDataMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.SubscriptionDataWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.SubscriptionDataCreateInput, required: true }),
      update: t.field({ type: Inputs.SubscriptionDataUpdateInput, required: true }),
    }))

export const upsertOneSubscriptionDataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'SubscriptionData',
    nullable: false,
    args: upsertOneSubscriptionDataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.subscriptionData.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneSubscriptionDataMutation = defineMutation((t) => ({
  upsertOneSubscriptionData: t.prismaField(upsertOneSubscriptionDataMutationObject(t)),
}));
