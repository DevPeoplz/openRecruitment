import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyOfferMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.OfferWhereInput, required: false }),
      data: t.field({ type: Inputs.OfferUpdateManyMutationInput, required: true }),
    }))

export const updateManyOfferMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyOfferMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.offer.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyOfferMutation = defineMutation((t) => ({
  updateManyOffer: t.field(updateManyOfferMutationObject(t)),
}));
