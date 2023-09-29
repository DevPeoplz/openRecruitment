import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyTalentPoolMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TalentPoolWhereInput, required: false }),
      data: t.field({ type: Inputs.TalentPoolUpdateManyMutationInput, required: true }),
    }))

export const updateManyTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyTalentPoolMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPool.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyTalentPoolMutation = defineMutation((t) => ({
  updateManyTalentPool: t.field(updateManyTalentPoolMutationObject(t)),
}));
