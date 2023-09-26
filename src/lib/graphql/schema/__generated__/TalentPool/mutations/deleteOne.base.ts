import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneTalentPoolMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TalentPoolWhereUniqueInput, required: true }) }))

export const deleteOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: true,
    args: deleteOneTalentPoolMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneTalentPoolMutation = defineMutation((t) => ({
  deleteOneTalentPool: t.prismaField(deleteOneTalentPoolMutationObject(t)),
}));
