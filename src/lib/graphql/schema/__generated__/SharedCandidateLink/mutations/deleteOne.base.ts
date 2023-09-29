import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneSharedCandidateLinkMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.SharedCandidateLinkWhereUniqueInput, required: true }) }))

export const deleteOneSharedCandidateLinkMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'SharedCandidateLink',
    nullable: true,
    args: deleteOneSharedCandidateLinkMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.sharedCandidateLink.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneSharedCandidateLinkMutation = defineMutation((t) => ({
  deleteOneSharedCandidateLink: t.prismaField(deleteOneSharedCandidateLinkMutationObject(t)),
}));
