import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneMatchMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.MatchCreateInput, required: true }) }))

export const createOneMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Match',
    nullable: false,
    args: createOneMatchMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.create({ data: args.data, ...query }),
  }),
);

export const createOneMatchMutation = defineMutation((t) => ({
  createOneMatch: t.prismaField(createOneMatchMutationObject(t)),
}));
