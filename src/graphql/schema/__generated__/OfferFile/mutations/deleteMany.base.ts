import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.OfferFileWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.offerFile.deleteMany({ where: args.where }),
  }),
);

export const deleteManyOfferFileMutation = defineMutation((t) => ({
  deleteManyOfferFile: t.field(deleteManyOfferFileMutationObject(t)),
}));
