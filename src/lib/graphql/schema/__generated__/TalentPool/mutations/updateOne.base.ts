import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneTalentPoolMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TalentPoolWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.TalentPoolUpdateInput, required: true }),
    }))

export const updateOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: true,
    args: updateOneTalentPoolMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneTalentPoolMutation = defineMutation((t) => ({
  updateOneTalentPool: t.prismaField(updateOneTalentPoolMutationObject(t)),
}));
