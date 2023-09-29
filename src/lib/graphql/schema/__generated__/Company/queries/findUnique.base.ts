import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueCompanyQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CompanyWhereUniqueInput, required: true }) }))

export const findUniqueCompanyQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Company',
    nullable: true,
    args: findUniqueCompanyQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.company.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueCompanyQuery = defineQuery((t) => ({
  findUniqueCompany: t.prismaField(findUniqueCompanyQueryObject(t)),
}));
