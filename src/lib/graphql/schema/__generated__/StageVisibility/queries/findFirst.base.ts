import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstStageVisibilityQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageVisibilityWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageVisibilityOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageVisibilityWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageVisibilityScalarFieldEnum], required: false }),
}))

export const findFirstStageVisibilityQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'StageVisibility',
    nullable: true,
    args: findFirstStageVisibilityQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageVisibility.findFirst({
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

export const findFirstStageVisibilityQuery = defineQuery((t) => ({
  findFirstStageVisibility: t.prismaField(findFirstStageVisibilityQueryObject(t)),
}));
