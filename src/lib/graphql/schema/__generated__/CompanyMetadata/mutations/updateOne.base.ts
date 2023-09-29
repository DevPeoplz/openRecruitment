import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneCompanyMetadataMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CompanyMetadataWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.CompanyMetadataUpdateInput, required: true }),
    }))

export const updateOneCompanyMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CompanyMetadata',
    nullable: true,
    args: updateOneCompanyMetadataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.companyMetadata.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneCompanyMetadataMutation = defineMutation((t) => ({
  updateOneCompanyMetadata: t.prismaField(updateOneCompanyMetadataMutationObject(t)),
}));
