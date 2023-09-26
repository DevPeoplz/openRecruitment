import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyOfferMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.OfferWhereInput, required: true }) }))

export const deleteManyOfferMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyOfferMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.offer.deleteMany({ where: args.where }),
  }),
);

export const deleteManyOfferMutation = defineMutation((t) => ({
  deleteManyOffer: t.field(deleteManyOfferMutationObject(t)),
}));
