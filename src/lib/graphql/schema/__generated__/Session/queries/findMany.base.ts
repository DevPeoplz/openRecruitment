import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManySessionQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.SessionWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.SessionOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.SessionWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.SessionScalarFieldEnum], required: false }),
}))

export const findManySessionQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Session'],
    nullable: false,
    args: findManySessionQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.session.findMany({
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

export const findManySessionQuery = defineQuery((t) => ({
  findManySession: t.prismaField(findManySessionQueryObject(t)),
}));
