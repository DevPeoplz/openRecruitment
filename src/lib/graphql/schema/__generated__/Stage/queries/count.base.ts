import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countStageQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageScalarFieldEnum], required: false }),
}))

export const countStageQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countStageQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.stage.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countStageQuery = defineQuery((t) => ({
  countStage: t.field(countStageQueryObject(t)),
}));
