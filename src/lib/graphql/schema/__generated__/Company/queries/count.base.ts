import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countCompanyQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CompanyWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CompanyOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CompanyWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CompanyScalarFieldEnum], required: false }),
}))

export const countCompanyQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countCompanyQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.company.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countCompanyQuery = defineQuery((t) => ({
  countCompany: t.field(countCompanyQueryObject(t)),
}));
