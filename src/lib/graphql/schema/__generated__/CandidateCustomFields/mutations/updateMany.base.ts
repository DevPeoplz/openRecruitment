import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyCandidateCustomFieldsMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CandidateCustomFieldsWhereInput, required: false }),
      data: t.field({ type: Inputs.CandidateCustomFieldsUpdateManyMutationInput, required: true }),
    }))

export const updateManyCandidateCustomFieldsMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyCandidateCustomFieldsMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.candidateCustomFields.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyCandidateCustomFieldsMutation = defineMutation((t) => ({
  updateManyCandidateCustomFields: t.field(updateManyCandidateCustomFieldsMutationObject(t)),
}));
