import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneStageMetadataMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.StageMetadataWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.StageMetadataUpdateInput, required: true }),
    }))

export const updateOneStageMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'StageMetadata',
    nullable: true,
    args: updateOneStageMetadataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageMetadata.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneStageMetadataMutation = defineMutation((t) => ({
  updateOneStageMetadata: t.prismaField(updateOneStageMetadataMutationObject(t)),
}));
