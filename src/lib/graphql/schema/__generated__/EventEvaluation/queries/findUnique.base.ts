import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueEventEvaluationQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventEvaluationWhereUniqueInput, required: true }) }))

export const findUniqueEventEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventEvaluation',
    nullable: true,
    args: findUniqueEventEvaluationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventEvaluation.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueEventEvaluationQuery = defineQuery((t) => ({
  findUniqueEventEvaluation: t.prismaField(findUniqueEventEvaluationQueryObject(t)),
}));
