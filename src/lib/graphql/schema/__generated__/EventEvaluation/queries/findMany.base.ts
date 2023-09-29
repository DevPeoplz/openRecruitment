import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyEventEvaluationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventEvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventEvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventEvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventEvaluationScalarFieldEnum], required: false }),
}))

export const findManyEventEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['EventEvaluation'],
    nullable: false,
    args: findManyEventEvaluationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventEvaluation.findMany({
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

export const findManyEventEvaluationQuery = defineQuery((t) => ({
  findManyEventEvaluation: t.prismaField(findManyEventEvaluationQueryObject(t)),
}));
