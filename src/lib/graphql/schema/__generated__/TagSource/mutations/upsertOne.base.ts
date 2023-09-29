import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneTagSourceMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TagSourceWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.TagSourceCreateInput, required: true }),
      update: t.field({ type: Inputs.TagSourceUpdateInput, required: true }),
    }))

export const upsertOneTagSourceMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TagSource',
    nullable: false,
    args: upsertOneTagSourceMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.tagSource.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneTagSourceMutation = defineMutation((t) => ({
  upsertOneTagSource: t.prismaField(upsertOneTagSourceMutationObject(t)),
}));
