import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneMatchMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.MatchWhereUniqueInput, required: true }) }))

export const deleteOneMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Match',
    nullable: true,
    args: deleteOneMatchMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.match.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneMatchMutation = defineMutation((t) => ({
  deleteOneMatch: t.prismaField(deleteOneMatchMutationObject(t)),
}));
