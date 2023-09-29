import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueCompanyMetadataQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CompanyMetadataWhereUniqueInput, required: true }) }))

export const findUniqueCompanyMetadataQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'CompanyMetadata',
    nullable: true,
    args: findUniqueCompanyMetadataQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.companyMetadata.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueCompanyMetadataQuery = defineQuery((t) => ({
  findUniqueCompanyMetadata: t.prismaField(findUniqueCompanyMetadataQueryObject(t)),
}));
