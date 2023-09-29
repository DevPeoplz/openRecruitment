import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countCompanyMetadataQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CompanyMetadataWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CompanyMetadataOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CompanyMetadataWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CompanyMetadataScalarFieldEnum], required: false }),
}))

export const countCompanyMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countCompanyMetadataQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.companyMetadata.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countCompanyMetadataQuery = defineQuery((t) => ({
  countCompanyMetadata: t.field(countCompanyMetadataQueryObject(t)),
}));
