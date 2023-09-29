import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneCandidateCustomFieldsMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.CandidateCustomFieldsCreateInput, required: true }) }))

export const createOneCandidateCustomFieldsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateCustomFields',
    nullable: false,
    args: createOneCandidateCustomFieldsMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateCustomFields.create({ data: args.data, ...query }),
  }),
);

export const createOneCandidateCustomFieldsMutation = defineMutation((t) => ({
  createOneCandidateCustomFields: t.prismaField(createOneCandidateCustomFieldsMutationObject(t)),
}));
