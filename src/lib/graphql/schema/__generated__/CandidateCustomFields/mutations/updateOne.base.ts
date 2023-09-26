import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneCandidateCustomFieldsMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CandidateCustomFieldsWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.CandidateCustomFieldsUpdateInput, required: true }),
    }))

export const updateOneCandidateCustomFieldsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateCustomFields',
    nullable: true,
    args: updateOneCandidateCustomFieldsMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateCustomFields.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneCandidateCustomFieldsMutation = defineMutation((t) => ({
  updateOneCandidateCustomFields: t.prismaField(updateOneCandidateCustomFieldsMutationObject(t)),
}));
