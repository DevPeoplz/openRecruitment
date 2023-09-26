import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneCandidateTagMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.CandidateTagCreateInput, required: true }) }))

export const createOneCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateTag',
    nullable: false,
    args: createOneCandidateTagMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.create({ data: args.data, ...query }),
  }),
);

export const createOneCandidateTagMutation = defineMutation((t) => ({
  createOneCandidateTag: t.prismaField(createOneCandidateTagMutationObject(t)),
}));
