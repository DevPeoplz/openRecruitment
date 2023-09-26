import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyTalentPoolMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TalentPoolWhereInput, required: true }) }))

export const deleteManyTalentPoolMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyTalentPoolMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPool.deleteMany({ where: args.where }),
  }),
);

export const deleteManyTalentPoolMutation = defineMutation((t) => ({
  deleteManyTalentPool: t.field(deleteManyTalentPoolMutationObject(t)),
}));
