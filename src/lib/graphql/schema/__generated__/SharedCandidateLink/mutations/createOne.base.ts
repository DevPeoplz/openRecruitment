import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneSharedCandidateLinkMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.SharedCandidateLinkCreateInput, required: true }) }))

export const createOneSharedCandidateLinkMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'SharedCandidateLink',
    nullable: false,
    args: createOneSharedCandidateLinkMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.sharedCandidateLink.create({ data: args.data, ...query }),
  }),
);

export const createOneSharedCandidateLinkMutation = defineMutation((t) => ({
  createOneSharedCandidateLink: t.prismaField(createOneSharedCandidateLinkMutationObject(t)),
}));
