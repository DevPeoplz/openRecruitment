import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyCandidateTagMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.CandidateTagCreateInput], required: true }) }))

export const createManyCandidateTagMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['CandidateTag'],
    nullable: false,
    args: createManyCandidateTagMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.candidateTag.create({ data }))),
  }),
);

export const createManyCandidateTagMutation = defineMutation((t) => ({
  createManyCandidateTag: t.prismaField(createManyCandidateTagMutationObject(t)),
}));
