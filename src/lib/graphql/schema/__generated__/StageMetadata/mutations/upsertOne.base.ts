import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneStageMetadataMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.StageMetadataWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.StageMetadataCreateInput, required: true }),
      update: t.field({ type: Inputs.StageMetadataUpdateInput, required: true }),
    }))

export const upsertOneStageMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'StageMetadata',
    nullable: false,
    args: upsertOneStageMetadataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageMetadata.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneStageMetadataMutation = defineMutation((t) => ({
  upsertOneStageMetadata: t.prismaField(upsertOneStageMetadataMutationObject(t)),
}));
