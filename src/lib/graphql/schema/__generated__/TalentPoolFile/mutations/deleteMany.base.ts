import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyTalentPoolFileMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TalentPoolFileWhereInput, required: true }) }))

export const deleteManyTalentPoolFileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyTalentPoolFileMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPoolFile.deleteMany({ where: args.where }),
  }),
);

export const deleteManyTalentPoolFileMutation = defineMutation((t) => ({
  deleteManyTalentPoolFile: t.field(deleteManyTalentPoolFileMutationObject(t)),
}));
