import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyTaskQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TaskWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TaskOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TaskWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TaskScalarFieldEnum], required: false }),
}))

export const findManyTaskQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Task'],
    nullable: false,
    args: findManyTaskQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.task.findMany({
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

export const findManyTaskQuery = defineQuery((t) => ({
  findManyTask: t.prismaField(findManyTaskQueryObject(t)),
}));
