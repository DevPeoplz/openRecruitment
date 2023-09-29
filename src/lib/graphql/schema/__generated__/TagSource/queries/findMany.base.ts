import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyTagSourceQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TagSourceWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TagSourceOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TagSourceWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TagSourceScalarFieldEnum], required: false }),
}))

export const findManyTagSourceQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['TagSource'],
    nullable: false,
    args: findManyTagSourceQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.tagSource.findMany({
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

export const findManyTagSourceQuery = defineQuery((t) => ({
  findManyTagSource: t.prismaField(findManyTagSourceQueryObject(t)),
}));
