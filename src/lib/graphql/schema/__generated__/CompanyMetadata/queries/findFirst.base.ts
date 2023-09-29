import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstCompanyMetadataQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.CompanyMetadataWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.CompanyMetadataOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.CompanyMetadataWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.CompanyMetadataScalarFieldEnum], required: false }),
}))

export const findFirstCompanyMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'CompanyMetadata',
    nullable: true,
    args: findFirstCompanyMetadataQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.companyMetadata.findFirst({
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

export const findFirstCompanyMetadataQuery = defineQuery((t) => ({
  findFirstCompanyMetadata: t.prismaField(findFirstCompanyMetadataQueryObject(t)),
}));
