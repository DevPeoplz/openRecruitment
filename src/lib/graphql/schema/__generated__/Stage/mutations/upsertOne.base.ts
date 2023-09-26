import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneStageMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.StageWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.StageCreateInput, required: true }),
      update: t.field({ type: Inputs.StageUpdateInput, required: true }),
    }))

export const upsertOneStageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Stage',
    nullable: false,
    args: upsertOneStageMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneStageMutation = defineMutation((t) => ({
  upsertOneStage: t.prismaField(upsertOneStageMutationObject(t)),
}));
