import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyTalentPoolFileMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TalentPoolFileWhereInput, required: false }),
      data: t.field({ type: Inputs.TalentPoolFileUpdateManyMutationInput, required: true }),
    }))

export const updateManyTalentPoolFileMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyTalentPoolFileMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPoolFile.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyTalentPoolFileMutation = defineMutation((t) => ({
  updateManyTalentPoolFile: t.field(updateManyTalentPoolFileMutationObject(t)),
}));
