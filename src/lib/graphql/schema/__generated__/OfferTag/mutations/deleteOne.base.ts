import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneOfferTagMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.OfferTagWhereUniqueInput, required: true }) }))

export const deleteOneOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferTag',
    nullable: true,
    args: deleteOneOfferTagMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerTag.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneOfferTagMutation = defineMutation((t) => ({
  deleteOneOfferTag: t.prismaField(deleteOneOfferTagMutationObject(t)),
}));
