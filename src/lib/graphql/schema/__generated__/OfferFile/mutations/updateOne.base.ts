import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneOfferFileMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.OfferFileWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.OfferFileUpdateInput, required: true }),
    }))

export const updateOneOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferFile',
    nullable: true,
    args: updateOneOfferFileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneOfferFileMutation = defineMutation((t) => ({
  updateOneOfferFile: t.prismaField(updateOneOfferFileMutationObject(t)),
}));
