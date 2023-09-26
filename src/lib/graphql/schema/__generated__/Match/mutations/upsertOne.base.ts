import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneMatchMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.MatchWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.MatchCreateInput, required: true }),
      update: t.field({ type: Inputs.MatchUpdateInput, required: true }),
    }))

export const upsertOneMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Match',
    nullable: false,
    args: upsertOneMatchMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneMatchMutation = defineMutation((t) => ({
  upsertOneMatch: t.prismaField(upsertOneMatchMutationObject(t)),
}));
