import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyStageVisibilityMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.StageVisibilityWhereInput, required: false }),
      data: t.field({ type: Inputs.StageVisibilityUpdateManyMutationInput, required: true }),
    }))

export const updateManyStageVisibilityMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyStageVisibilityMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.stageVisibility.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyStageVisibilityMutation = defineMutation((t) => ({
  updateManyStageVisibility: t.field(updateManyStageVisibilityMutationObject(t)),
}));
