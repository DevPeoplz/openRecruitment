import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneTalentPoolMatchMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.TalentPoolMatchCreateInput, required: true }) }))

export const createOneTalentPoolMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPoolMatch',
    nullable: false,
    args: createOneTalentPoolMatchMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolMatch.create({ data: args.data, ...query }),
  }),
);

export const createOneTalentPoolMatchMutation = defineMutation((t) => ({
  createOneTalentPoolMatch: t.prismaField(createOneTalentPoolMatchMutationObject(t)),
}));
