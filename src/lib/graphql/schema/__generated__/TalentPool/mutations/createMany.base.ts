import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyTalentPoolMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.TalentPoolCreateInput], required: true }) }))

export const createManyTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['TalentPool'],
    nullable: false,
    args: createManyTalentPoolMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.talentPool.create({ data }))),
  }),
);

export const createManyTalentPoolMutation = defineMutation((t) => ({
  createManyTalentPool: t.prismaField(createManyTalentPoolMutationObject(t)),
}));
