import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyStageMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.StageWhereInput, required: false }),
      data: t.field({ type: Inputs.StageUpdateManyMutationInput, required: true }),
    }))

export const updateManyStageMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyStageMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.stage.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyStageMutation = defineMutation((t) => ({
  updateManyStage: t.field(updateManyStageMutationObject(t)),
}));
