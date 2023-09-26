import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyTemplateQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.TemplateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.TemplateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.TemplateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.TemplateScalarFieldEnum], required: false }),
}))

export const findManyTemplateQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Template'],
    nullable: false,
    args: findManyTemplateQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.template.findMany({
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

export const findManyTemplateQuery = defineQuery((t) => ({
  findManyTemplate: t.prismaField(findManyTemplateQueryObject(t)),
}));
