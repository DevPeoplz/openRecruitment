import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManySharedCandidateLinkMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.SharedCandidateLinkCreateInput], required: true }) }))

export const createManySharedCandidateLinkMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['SharedCandidateLink'],
    nullable: false,
    args: createManySharedCandidateLinkMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.sharedCandidateLink.create({ data }))),
  }),
);

export const createManySharedCandidateLinkMutation = defineMutation((t) => ({
  createManySharedCandidateLink: t.prismaField(createManySharedCandidateLinkMutationObject(t)),
}));
