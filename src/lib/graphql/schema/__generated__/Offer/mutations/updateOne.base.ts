import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneOfferMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.OfferWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.OfferUpdateInput, required: true }),
    }))

export const updateOneOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Offer',
    nullable: true,
    args: updateOneOfferMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneOfferMutation = defineMutation((t) => ({
  updateOneOffer: t.prismaField(updateOneOfferMutationObject(t)),
}));
