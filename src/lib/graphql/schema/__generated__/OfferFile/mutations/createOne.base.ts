import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneOfferFileMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.OfferFileCreateInput, required: true }) }))

export const createOneOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferFile',
    nullable: false,
    args: createOneOfferFileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.create({ data: args.data, ...query }),
  }),
);

export const createOneOfferFileMutation = defineMutation((t) => ({
  createOneOfferFile: t.prismaField(createOneOfferFileMutationObject(t)),
}));
