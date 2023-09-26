import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyCompanyQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CompanyWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CompanyOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CompanyWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CompanyScalarFieldEnum], required: false }),
}))

export const findManyCompanyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Company'],
    nullable: false,
    args: findManyCompanyQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.findMany({
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

export const findManyCompanyQuery = defineQuery((t) => ({
  findManyCompany: t.prismaField(findManyCompanyQueryObject(t)),
}));
