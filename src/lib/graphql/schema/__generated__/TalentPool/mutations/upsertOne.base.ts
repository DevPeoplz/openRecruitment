import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneTalentPoolMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TalentPoolWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.TalentPoolCreateInput, required: true }),
      update: t.field({ type: Inputs.TalentPoolUpdateInput, required: true }),
    }))

export const upsertOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: false,
    args: upsertOneTalentPoolMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneTalentPoolMutation = defineMutation((t) => ({
  upsertOneTalentPool: t.prismaField(upsertOneTalentPoolMutationObject(t)),
}));
