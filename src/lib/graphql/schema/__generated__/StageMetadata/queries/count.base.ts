import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countStageMetadataQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageMetadataWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageMetadataOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageMetadataWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageMetadataScalarFieldEnum], required: false }),
}))

export const countStageMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countStageMetadataQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.stageMetadata.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countStageMetadataQuery = defineQuery((t) => ({
  countStageMetadata: t.field(countStageMetadataQueryObject(t)),
}));
