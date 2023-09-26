import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneOfferFileMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.OfferFileWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.OfferFileCreateInput, required: true }),
      update: t.field({ type: Inputs.OfferFileUpdateInput, required: true }),
    }))

export const upsertOneOfferFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'OfferFile',
    nullable: false,
    args: upsertOneOfferFileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.offerFile.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneOfferFileMutation = defineMutation((t) => ({
  upsertOneOfferFile: t.prismaField(upsertOneOfferFileMutationObject(t)),
}));
