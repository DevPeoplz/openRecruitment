import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyCompanyMetadataMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.CompanyMetadataCreateInput], required: true }) }))

export const createManyCompanyMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['CompanyMetadata'],
    nullable: false,
    args: createManyCompanyMetadataMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.companyMetadata.create({ data }))),
  }),
);

export const createManyCompanyMetadataMutation = defineMutation((t) => ({
  createManyCompanyMetadata: t.prismaField(createManyCompanyMetadataMutationObject(t)),
}));
