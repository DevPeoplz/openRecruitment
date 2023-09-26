import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneCandidateTagMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CandidateTagWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.CandidateTagUpdateInput, required: true }),
    }))

export const updateOneCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateTag',
    nullable: true,
    args: updateOneCandidateTagMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneCandidateTagMutation = defineMutation((t) => ({
  updateOneCandidateTag: t.prismaField(updateOneCandidateTagMutationObject(t)),
}));
