import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyOfferFileMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.OfferFileWhereInput, required: false }),
      data: t.field({ type: Inputs.OfferFileUpdateManyMutationInput, required: true }),
    }))

export const updateManyOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyOfferFileMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.offerFile.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyOfferFileMutation = defineMutation((t) => ({
  updateManyOfferFile: t.field(updateManyOfferFileMutationObject(t)),
}));
