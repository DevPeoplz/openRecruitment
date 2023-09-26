import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyStageMetadataQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageMetadataWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageMetadataOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageMetadataWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageMetadataScalarFieldEnum], required: false }),
}))

export const findManyStageMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['StageMetadata'],
    nullable: false,
    args: findManyStageMetadataQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageMetadata.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findManyStageMetadataQuery = defineQuery((t) => ({
  findManyStageMetadata: t.prismaField(findManyStageMetadataQueryObject(t)),
}));
