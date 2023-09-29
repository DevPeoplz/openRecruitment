import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyCandidateCustomFieldsMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CandidateCustomFieldsWhereInput, required: true }) }))

export const deleteManyCandidateCustomFieldsMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyCandidateCustomFieldsMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.candidateCustomFields.deleteMany({ where: args.where }),
  }),
);

export const deleteManyCandidateCustomFieldsMutation = defineMutation((t) => ({
  deleteManyCandidateCustomFields: t.field(deleteManyCandidateCustomFieldsMutationObject(t)),
}));
