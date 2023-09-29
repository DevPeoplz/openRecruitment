import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyCompanyMetadataMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CompanyMetadataWhereInput, required: false }),
      data: t.field({ type: Inputs.CompanyMetadataUpdateManyMutationInput, required: true }),
    }))

export const updateManyCompanyMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyCompanyMetadataMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.companyMetadata.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyCompanyMetadataMutation = defineMutation((t) => ({
  updateManyCompanyMetadata: t.field(updateManyCompanyMetadataMutationObject(t)),
}));
