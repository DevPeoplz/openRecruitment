import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyStageVisibilityMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.StageVisibilityWhereInput, required: true }) }))

export const deleteManyStageVisibilityMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyStageVisibilityMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.stageVisibility.deleteMany({ where: args.where }),
  }),
);

export const deleteManyStageVisibilityMutation = defineMutation((t) => ({
  deleteManyStageVisibility: t.field(deleteManyStageVisibilityMutationObject(t)),
}));
