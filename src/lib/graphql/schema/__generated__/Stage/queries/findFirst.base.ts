import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstStageQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageScalarFieldEnum], required: false }),
}))

export const findFirstStageQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Stage',
    nullable: true,
    args: findFirstStageQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.findFirst({
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

export const findFirstStageQuery = defineQuery((t) => ({
  findFirstStage: t.prismaField(findFirstStageQueryObject(t)),
}));
