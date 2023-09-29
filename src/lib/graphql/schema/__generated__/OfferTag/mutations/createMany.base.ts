import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyOfferTagMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.OfferTagCreateInput], required: true }) }))

export const createManyOfferTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['OfferTag'],
    nullable: false,
    args: createManyOfferTagMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.offerTag.create({ data }))),
  }),
);

export const createManyOfferTagMutation = defineMutation((t) => ({
  createManyOfferTag: t.prismaField(createManyOfferTagMutationObject(t)),
}));
