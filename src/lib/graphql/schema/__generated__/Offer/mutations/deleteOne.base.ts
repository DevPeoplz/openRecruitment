import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneOfferMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.OfferWhereUniqueInput, required: true }) }))

export const deleteOneOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Offer',
    nullable: true,
    args: deleteOneOfferMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneOfferMutation = defineMutation((t) => ({
  deleteOneOffer: t.prismaField(deleteOneOfferMutationObject(t)),
}));
