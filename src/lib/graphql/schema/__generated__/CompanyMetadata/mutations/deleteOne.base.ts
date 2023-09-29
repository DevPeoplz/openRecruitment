import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneCompanyMetadataMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CompanyMetadataWhereUniqueInput, required: true }) }))

export const deleteOneCompanyMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CompanyMetadata',
    nullable: true,
    args: deleteOneCompanyMetadataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.companyMetadata.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneCompanyMetadataMutation = defineMutation((t) => ({
  deleteOneCompanyMetadata: t.prismaField(deleteOneCompanyMetadataMutationObject(t)),
}));
