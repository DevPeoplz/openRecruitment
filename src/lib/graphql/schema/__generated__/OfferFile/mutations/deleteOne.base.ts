import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneOfferFileMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.OfferFileWhereUniqueInput, required: true }) }))

export const deleteOneOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferFile',
    nullable: true,
    args: deleteOneOfferFileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneOfferFileMutation = defineMutation((t) => ({
  deleteOneOfferFile: t.prismaField(deleteOneOfferFileMutationObject(t)),
}));
