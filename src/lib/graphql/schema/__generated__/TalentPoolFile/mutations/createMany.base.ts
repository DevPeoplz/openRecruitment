import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyTalentPoolFileMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.TalentPoolFileCreateInput], required: true }) }))

export const createManyTalentPoolFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['TalentPoolFile'],
    nullable: false,
    args: createManyTalentPoolFileMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.talentPoolFile.create({ data }))),
  }),
);

export const createManyTalentPoolFileMutation = defineMutation((t) => ({
  createManyTalentPoolFile: t.prismaField(createManyTalentPoolFileMutationObject(t)),
}));
