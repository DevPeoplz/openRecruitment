import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneCandidateTagMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CandidateTagWhereUniqueInput, required: true }) }))

export const deleteOneCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateTag',
    nullable: true,
    args: deleteOneCandidateTagMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneCandidateTagMutation = defineMutation((t) => ({
  deleteOneCandidateTag: t.prismaField(deleteOneCandidateTagMutationObject(t)),
}));
