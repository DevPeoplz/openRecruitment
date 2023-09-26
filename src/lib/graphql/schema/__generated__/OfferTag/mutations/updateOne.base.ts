import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneOfferTagMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.OfferTagWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.OfferTagUpdateInput, required: true }),
    }))

export const updateOneOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferTag',
    nullable: true,
    args: updateOneOfferTagMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneOfferTagMutation = defineMutation((t) => ({
  updateOneOfferTag: t.prismaField(updateOneOfferTagMutationObject(t)),
}));
