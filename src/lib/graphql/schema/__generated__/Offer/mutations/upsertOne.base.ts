import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneOfferMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.OfferWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.OfferCreateInput, required: true }),
      update: t.field({ type: Inputs.OfferUpdateInput, required: true }),
    }))

export const upsertOneOfferMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Offer',
    nullable: false,
    args: upsertOneOfferMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offer.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneOfferMutation = defineMutation((t) => ({
  upsertOneOffer: t.prismaField(upsertOneOfferMutationObject(t)),
}));
