import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyStageMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.StageWhereInput, required: true }) }))

export const deleteManyStageMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyStageMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.stage.deleteMany({ where: args.where }),
  }),
);

export const deleteManyStageMutation = defineMutation((t) => ({
  deleteManyStage: t.field(deleteManyStageMutationObject(t)),
}));
