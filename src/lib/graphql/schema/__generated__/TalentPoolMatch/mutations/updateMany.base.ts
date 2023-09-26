import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyTalentPoolMatchMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TalentPoolMatchWhereInput, required: false }),
      data: t.field({ type: Inputs.TalentPoolMatchUpdateManyMutationInput, required: true }),
    }))

export const updateManyTalentPoolMatchMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyTalentPoolMatchMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPoolMatch.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyTalentPoolMatchMutation = defineMutation((t) => ({
  updateManyTalentPoolMatch: t.field(updateManyTalentPoolMatchMutationObject(t)),
}));
