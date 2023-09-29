import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneCompanyMetadataMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.CompanyMetadataCreateInput, required: true }) }))

export const createOneCompanyMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CompanyMetadata',
    nullable: false,
    args: createOneCompanyMetadataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.companyMetadata.create({ data: args.data, ...query }),
  }),
);

export const createOneCompanyMetadataMutation = defineMutation((t) => ({
  createOneCompanyMetadata: t.prismaField(createOneCompanyMetadataMutationObject(t)),
}));
