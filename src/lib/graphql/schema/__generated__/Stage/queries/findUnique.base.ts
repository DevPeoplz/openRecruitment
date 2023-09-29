import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueStageQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.StageWhereUniqueInput, required: true }) }))

export const findUniqueStageQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Stage',
    nullable: true,
    args: findUniqueStageQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stage.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueStageQuery = defineQuery((t) => ({
  findUniqueStage: t.prismaField(findUniqueStageQueryObject(t)),
}));
