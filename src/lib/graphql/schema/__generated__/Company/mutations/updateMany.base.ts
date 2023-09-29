import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyCompanyMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CompanyWhereInput, required: false }),
      data: t.field({ type: Inputs.CompanyUpdateManyMutationInput, required: true }),
    }))

export const updateManyCompanyMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyCompanyMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.company.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyCompanyMutation = defineMutation((t) => ({
  updateManyCompany: t.field(updateManyCompanyMutationObject(t)),
}));
