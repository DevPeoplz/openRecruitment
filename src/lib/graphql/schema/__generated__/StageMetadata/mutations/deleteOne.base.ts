import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneStageMetadataMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.StageMetadataWhereUniqueInput, required: true }) }))

export const deleteOneStageMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'StageMetadata',
    nullable: true,
    args: deleteOneStageMetadataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageMetadata.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneStageMetadataMutation = defineMutation((t) => ({
  deleteOneStageMetadata: t.prismaField(deleteOneStageMetadataMutationObject(t)),
}));
