import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyStageMetadataMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.StageMetadataWhereInput, required: false }),
      data: t.field({ type: Inputs.StageMetadataUpdateManyMutationInput, required: true }),
    }))

export const updateManyStageMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyStageMetadataMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.stageMetadata.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyStageMetadataMutation = defineMutation((t) => ({
  updateManyStageMetadata: t.field(updateManyStageMetadataMutationObject(t)),
}));
