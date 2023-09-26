import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneStageMetadataMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.StageMetadataCreateInput, required: true }) }))

export const createOneStageMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'StageMetadata',
    nullable: false,
    args: createOneStageMetadataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageMetadata.create({ data: args.data, ...query }),
  }),
);

export const createOneStageMetadataMutation = defineMutation((t) => ({
  createOneStageMetadata: t.prismaField(createOneStageMetadataMutationObject(t)),
}));
