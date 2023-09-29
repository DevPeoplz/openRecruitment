import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneCandidateMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CandidateWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.CandidateCreateInput, required: true }),
      update: t.field({ type: Inputs.CandidateUpdateInput, required: true }),
    }))

export const upsertOneCandidateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Candidate',
    nullable: false,
    args: upsertOneCandidateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidate.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneCandidateMutation = defineMutation((t) => ({
  upsertOneCandidate: t.prismaField(upsertOneCandidateMutationObject(t)),
}));
