import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyOfferFileMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.OfferFileCreateInput], required: true }) }))

export const createManyOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['OfferFile'],
    nullable: false,
    args: createManyOfferFileMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.offerFile.create({ data }))),
  }),
);

export const createManyOfferFileMutation = defineMutation((t) => ({
  createManyOfferFile: t.prismaField(createManyOfferFileMutationObject(t)),
}));
