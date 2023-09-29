import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyCandidateCustomFieldsMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.CandidateCustomFieldsCreateInput], required: true }) }))

export const createManyCandidateCustomFieldsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['CandidateCustomFields'],
    nullable: false,
    args: createManyCandidateCustomFieldsMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.candidateCustomFields.create({ data }))),
  }),
);

export const createManyCandidateCustomFieldsMutation = defineMutation((t) => ({
  createManyCandidateCustomFields: t.prismaField(createManyCandidateCustomFieldsMutationObject(t)),
}));
