import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.OfferTagWhereInput, required: false }),
      data: t.arg({ type: Inputs.OfferTagUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.offerTag.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyOfferTagMutation = defineMutation((t) => ({
  updateManyOfferTag: t.field(updateManyOfferTagMutationObject(t)),
}));
