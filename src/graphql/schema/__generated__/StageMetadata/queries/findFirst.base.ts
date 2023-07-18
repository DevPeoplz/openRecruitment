import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { prisma } from '@/prisma';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstStageMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'StageMetadata',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.StageMetadataWhereInput, required: false }),
      orderBy: t.arg({ type: [Inputs.StageMetadataOrderByWithRelationInput], required: false }),
      cursor: t.arg({ type: Inputs.StageMetadataWhereUniqueInput, required: false }),
      take: t.arg({ type: 'Int', required: false }),
      skip: t.arg({ type: 'Int', required: false }),
      distinct: t.arg({ type: [Inputs.StageMetadataScalarFieldEnum], required: false }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageMetadata.findFirst({
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

export const findFirstStageMetadataQuery = defineQuery((t) => ({
  findFirstStageMetadata: t.prismaField(findFirstStageMetadataQueryObject(t)),
}));
