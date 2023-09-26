import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneTalentPoolMatchMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TalentPoolMatchWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.TalentPoolMatchCreateInput, required: true }),
      update: t.field({ type: Inputs.TalentPoolMatchUpdateInput, required: true }),
    }))

export const upsertOneTalentPoolMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPoolMatch',
    nullable: false,
    args: upsertOneTalentPoolMatchMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolMatch.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneTalentPoolMatchMutation = defineMutation((t) => ({
  upsertOneTalentPoolMatch: t.prismaField(upsertOneTalentPoolMatchMutationObject(t)),
}));
