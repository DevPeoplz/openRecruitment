import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyStageMetadataMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.StageMetadataCreateInput], required: true }) }))

export const createManyStageMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['StageMetadata'],
    nullable: false,
    args: createManyStageMetadataMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.stageMetadata.create({ data }))),
  }),
);

export const createManyStageMetadataMutation = defineMutation((t) => ({
  createManyStageMetadata: t.prismaField(createManyStageMetadataMutationObject(t)),
}));
