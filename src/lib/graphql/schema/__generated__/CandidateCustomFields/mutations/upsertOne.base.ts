import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneCandidateCustomFieldsMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CandidateCustomFieldsWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.CandidateCustomFieldsCreateInput, required: true }),
      update: t.field({ type: Inputs.CandidateCustomFieldsUpdateInput, required: true }),
    }))

export const upsertOneCandidateCustomFieldsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateCustomFields',
    nullable: false,
    args: upsertOneCandidateCustomFieldsMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateCustomFields.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneCandidateCustomFieldsMutation = defineMutation((t) => ({
  upsertOneCandidateCustomFields: t.prismaField(upsertOneCandidateCustomFieldsMutationObject(t)),
}));
