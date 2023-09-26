import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneOfferMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.OfferCreateInput, required: true }) }))

export const createOneOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Offer',
    nullable: false,
    args: createOneOfferMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.create({ data: args.data, ...query }),
  }),
);

export const createOneOfferMutation = defineMutation((t) => ({
  createOneOffer: t.prismaField(createOneOfferMutationObject(t)),
}));
