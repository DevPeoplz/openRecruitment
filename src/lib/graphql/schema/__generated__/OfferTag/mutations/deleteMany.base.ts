import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyOfferTagMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.OfferTagWhereInput, required: true }) }))

export const deleteManyOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyOfferTagMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.offerTag.deleteMany({ where: args.where }),
  }),
);

export const deleteManyOfferTagMutation = defineMutation((t) => ({
  deleteManyOfferTag: t.field(deleteManyOfferTagMutationObject(t)),
}));
