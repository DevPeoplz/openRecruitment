import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneCandidateTagMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CandidateTagWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.CandidateTagCreateInput, required: true }),
      update: t.field({ type: Inputs.CandidateTagUpdateInput, required: true }),
    }))

export const upsertOneCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'CandidateTag',
    nullable: false,
    args: upsertOneCandidateTagMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.candidateTag.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneCandidateTagMutation = defineMutation((t) => ({
  upsertOneCandidateTag: t.prismaField(upsertOneCandidateTagMutationObject(t)),
}));
