import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyCompanyMetadataMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CompanyMetadataWhereInput, required: true }) }))

export const deleteManyCompanyMetadataMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyCompanyMetadataMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.companyMetadata.deleteMany({ where: args.where }),
  }),
);

export const deleteManyCompanyMetadataMutation = defineMutation((t) => ({
  deleteManyCompanyMetadata: t.field(deleteManyCompanyMetadataMutationObject(t)),
}));
