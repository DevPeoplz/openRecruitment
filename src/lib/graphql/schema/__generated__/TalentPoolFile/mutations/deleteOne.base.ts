import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneTalentPoolFileMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TalentPoolFileWhereUniqueInput, required: true }) }))

export const deleteOneTalentPoolFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPoolFile',
    nullable: true,
    args: deleteOneTalentPoolFileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolFile.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneTalentPoolFileMutation = defineMutation((t) => ({
  deleteOneTalentPoolFile: t.prismaField(deleteOneTalentPoolFileMutationObject(t)),
}));
