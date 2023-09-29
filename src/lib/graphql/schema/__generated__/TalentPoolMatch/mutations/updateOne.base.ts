import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneTalentPoolMatchMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TalentPoolMatchWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.TalentPoolMatchUpdateInput, required: true }),
    }))

export const updateOneTalentPoolMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPoolMatch',
    nullable: true,
    args: updateOneTalentPoolMatchMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolMatch.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneTalentPoolMatchMutation = defineMutation((t) => ({
  updateOneTalentPoolMatch: t.prismaField(updateOneTalentPoolMatchMutationObject(t)),
}));
