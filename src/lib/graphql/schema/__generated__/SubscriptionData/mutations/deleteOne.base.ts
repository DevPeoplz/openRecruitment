import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneSubscriptionDataMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.SubscriptionDataWhereUniqueInput, required: true }) }))

export const deleteOneSubscriptionDataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'SubscriptionData',
    nullable: true,
    args: deleteOneSubscriptionDataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.subscriptionData.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneSubscriptionDataMutation = defineMutation((t) => ({
  deleteOneSubscriptionData: t.prismaField(deleteOneSubscriptionDataMutationObject(t)),
}));
