import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueStageMetadataQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.StageMetadataWhereUniqueInput, required: true }) }))

export const findUniqueStageMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'StageMetadata',
    nullable: true,
    args: findUniqueStageMetadataQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageMetadata.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueStageMetadataQuery = defineQuery((t) => ({
  findUniqueStageMetadata: t.prismaField(findUniqueStageMetadataQueryObject(t)),
}));
