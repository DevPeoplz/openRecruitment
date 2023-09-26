import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneCompanyMetadataMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CompanyMetadataWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.CompanyMetadataCreateInput, required: true }),
      update: t.field({ type: Inputs.CompanyMetadataUpdateInput, required: true }),
    }))

export const upsertOneCompanyMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CompanyMetadata',
    nullable: false,
    args: upsertOneCompanyMetadataMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.companyMetadata.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneCompanyMetadataMutation = defineMutation((t) => ({
  upsertOneCompanyMetadata: t.prismaField(upsertOneCompanyMetadataMutationObject(t)),
}));
