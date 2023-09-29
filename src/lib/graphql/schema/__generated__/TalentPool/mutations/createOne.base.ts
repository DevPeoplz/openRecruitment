import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneTalentPoolMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.TalentPoolCreateInput, required: true }) }))

export const createOneTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPool',
    nullable: false,
    args: createOneTalentPoolMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPool.create({ data: args.data, ...query }),
  }),
);

export const createOneTalentPoolMutation = defineMutation((t) => ({
  createOneTalentPool: t.prismaField(createOneTalentPoolMutationObject(t)),
}));
