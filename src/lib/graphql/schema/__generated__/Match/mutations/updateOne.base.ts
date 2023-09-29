import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneMatchMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.MatchWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.MatchUpdateInput, required: true }),
    }))

export const updateOneMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Match',
    nullable: true,
    args: updateOneMatchMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneMatchMutation = defineMutation((t) => ({
  updateOneMatch: t.prismaField(updateOneMatchMutationObject(t)),
}));
