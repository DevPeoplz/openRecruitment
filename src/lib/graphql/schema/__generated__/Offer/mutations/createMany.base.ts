import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyOfferMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.OfferCreateInput], required: true }) }))

export const createManyOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Offer'],
    nullable: false,
    args: createManyOfferMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.offer.create({ data }))),
  }),
);

export const createManyOfferMutation = defineMutation((t) => ({
  createManyOffer: t.prismaField(createManyOfferMutationObject(t)),
}));
