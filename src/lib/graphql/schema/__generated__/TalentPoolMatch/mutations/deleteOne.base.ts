import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneTalentPoolMatchMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TalentPoolMatchWhereUniqueInput, required: true }) }))

export const deleteOneTalentPoolMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPoolMatch',
    nullable: true,
    args: deleteOneTalentPoolMatchMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolMatch.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneTalentPoolMatchMutation = defineMutation((t) => ({
  deleteOneTalentPoolMatch: t.prismaField(deleteOneTalentPoolMatchMutationObject(t)),
}));
