import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneCandidateCustomFieldsMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CandidateCustomFieldsWhereUniqueInput, required: true }) }))

export const deleteOneCandidateCustomFieldsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateCustomFields',
    nullable: true,
    args: deleteOneCandidateCustomFieldsMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateCustomFields.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneCandidateCustomFieldsMutation = defineMutation((t) => ({
  deleteOneCandidateCustomFields: t.prismaField(deleteOneCandidateCustomFieldsMutationObject(t)),
}));
