import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstEventEvaluationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.EventEvaluationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.EventEvaluationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.EventEvaluationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.EventEvaluationScalarFieldEnum], required: false }),
}))

export const findFirstEventEvaluationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'EventEvaluation',
    nullable: true,
    args: findFirstEventEvaluationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventEvaluation.findFirst({
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

export const findFirstEventEvaluationQuery = defineQuery((t) => ({
  findFirstEventEvaluation: t.prismaField(findFirstEventEvaluationQueryObject(t)),
}));
