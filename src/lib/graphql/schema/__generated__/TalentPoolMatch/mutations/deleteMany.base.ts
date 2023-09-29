import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyTalentPoolMatchMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TalentPoolMatchWhereInput, required: true }) }))

export const deleteManyTalentPoolMatchMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyTalentPoolMatchMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.talentPoolMatch.deleteMany({ where: args.where }),
  }),
);

export const deleteManyTalentPoolMatchMutation = defineMutation((t) => ({
  deleteManyTalentPoolMatch: t.field(deleteManyTalentPoolMatchMutationObject(t)),
}));
