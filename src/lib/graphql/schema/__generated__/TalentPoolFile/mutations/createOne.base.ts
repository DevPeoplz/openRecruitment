import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneTalentPoolFileMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.TalentPoolFileCreateInput, required: true }) }))

export const createOneTalentPoolFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPoolFile',
    nullable: false,
    args: createOneTalentPoolFileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolFile.create({ data: args.data, ...query }),
  }),
);

export const createOneTalentPoolFileMutation = defineMutation((t) => ({
  createOneTalentPoolFile: t.prismaField(createOneTalentPoolFileMutationObject(t)),
}));
