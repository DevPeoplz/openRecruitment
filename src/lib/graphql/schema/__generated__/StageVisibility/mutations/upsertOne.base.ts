import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneStageVisibilityMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.StageVisibilityWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.StageVisibilityCreateInput, required: true }),
      update: t.field({ type: Inputs.StageVisibilityUpdateInput, required: true }),
    }))

export const upsertOneStageVisibilityMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'StageVisibility',
    nullable: false,
    args: upsertOneStageVisibilityMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageVisibility.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneStageVisibilityMutation = defineMutation((t) => ({
  upsertOneStageVisibility: t.prismaField(upsertOneStageVisibilityMutationObject(t)),
}));
