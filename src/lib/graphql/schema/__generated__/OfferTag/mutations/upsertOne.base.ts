import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneOfferTagMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.OfferTagWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.OfferTagCreateInput, required: true }),
      update: t.field({ type: Inputs.OfferTagUpdateInput, required: true }),
    }))

export const upsertOneOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferTag',
    nullable: false,
    args: upsertOneOfferTagMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneOfferTagMutation = defineMutation((t) => ({
  upsertOneOfferTag: t.prismaField(upsertOneOfferTagMutationObject(t)),
}));
