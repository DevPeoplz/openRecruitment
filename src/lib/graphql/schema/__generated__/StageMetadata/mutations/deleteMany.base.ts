import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyStageMetadataMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.StageMetadataWhereInput, required: true }) }))

export const deleteManyStageMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyStageMetadataMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.stageMetadata.deleteMany({ where: args.where }),
  }),
);

export const deleteManyStageMetadataMutation = defineMutation((t) => ({
  deleteManyStageMetadata: t.field(deleteManyStageMetadataMutationObject(t)),
}));
