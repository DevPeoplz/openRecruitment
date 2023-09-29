import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneTalentPoolFileMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TalentPoolFileWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.TalentPoolFileCreateInput, required: true }),
      update: t.field({ type: Inputs.TalentPoolFileUpdateInput, required: true }),
    }))

export const upsertOneTalentPoolFileMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TalentPoolFile',
    nullable: false,
    args: upsertOneTalentPoolFileMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.talentPoolFile.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneTalentPoolFileMutation = defineMutation((t) => ({
  upsertOneTalentPoolFile: t.prismaField(upsertOneTalentPoolFileMutationObject(t)),
}));
