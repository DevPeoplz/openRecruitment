import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyOfferFileMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.OfferFileWhereInput, required: true }) }))

export const deleteManyOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyOfferFileMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.offerFile.deleteMany({ where: args.where }),
  }),
);

export const deleteManyOfferFileMutation = defineMutation((t) => ({
  deleteManyOfferFile: t.field(deleteManyOfferFileMutationObject(t)),
}));
