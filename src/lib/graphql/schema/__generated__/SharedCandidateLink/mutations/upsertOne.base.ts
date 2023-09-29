import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneSharedCandidateLinkMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.SharedCandidateLinkWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.SharedCandidateLinkCreateInput, required: true }),
      update: t.field({ type: Inputs.SharedCandidateLinkUpdateInput, required: true }),
    }))

export const upsertOneSharedCandidateLinkMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'SharedCandidateLink',
    nullable: false,
    args: upsertOneSharedCandidateLinkMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.sharedCandidateLink.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneSharedCandidateLinkMutation = defineMutation((t) => ({
  upsertOneSharedCandidateLink: t.prismaField(upsertOneSharedCandidateLinkMutationObject(t)),
}));
