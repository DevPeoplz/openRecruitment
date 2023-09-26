import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyStageQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.StageWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.StageOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.StageWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.StageScalarFieldEnum], required: false }),
}))

export const findManyStageQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Stage'],
    nullable: false,
    args: findManyStageQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.findMany({
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

export const findManyStageQuery = defineQuery((t) => ({
  findManyStage: t.prismaField(findManyStageQueryObject(t)),
}));
