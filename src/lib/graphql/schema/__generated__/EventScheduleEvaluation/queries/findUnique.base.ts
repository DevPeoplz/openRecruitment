import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueEventScheduleEvaluationQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventScheduleEvaluationWhereUniqueInput, required: true }) }))

export const findUniqueEventScheduleEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventScheduleEvaluation',
    nullable: true,
    args: findUniqueEventScheduleEvaluationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleEvaluation.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueEventScheduleEvaluationQuery = defineQuery((t) => ({
  findUniqueEventScheduleEvaluation: t.prismaField(findUniqueEventScheduleEvaluationQueryObject(t)),
}));
