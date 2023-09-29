import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueStageVisibilityQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.StageVisibilityWhereUniqueInput, required: true }) }))

export const findUniqueStageVisibilityQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'StageVisibility',
    nullable: true,
    args: findUniqueStageVisibilityQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.stageVisibility.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueStageVisibilityQuery = defineQuery((t) => ({
  findUniqueStageVisibility: t.prismaField(findUniqueStageVisibilityQueryObject(t)),
}));
