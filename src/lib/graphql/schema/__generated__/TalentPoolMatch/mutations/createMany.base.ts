import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyTalentPoolMatchMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.TalentPoolMatchCreateInput], required: true }) }))

export const createManyTalentPoolMatchMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['TalentPoolMatch'],
    nullable: false,
    args: createManyTalentPoolMatchMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.talentPoolMatch.create({ data }))),
  }),
);

export const createManyTalentPoolMatchMutation = defineMutation((t) => ({
  createManyTalentPoolMatch: t.prismaField(createManyTalentPoolMatchMutationObject(t)),
}));
