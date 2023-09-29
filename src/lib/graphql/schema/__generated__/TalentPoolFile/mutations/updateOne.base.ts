import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneTalentPoolFileMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TalentPoolFileWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.TalentPoolFileUpdateInput, required: true }),
    }))

export const updateOneTalentPoolFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPoolFile',
    nullable: true,
    args: updateOneTalentPoolFileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolFile.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneTalentPoolFileMutation = defineMutation((t) => ({
  updateOneTalentPoolFile: t.prismaField(updateOneTalentPoolFileMutationObject(t)),
}));
