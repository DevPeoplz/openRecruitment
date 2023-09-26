import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyDisqualifyReasonMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.DisqualifyReasonWhereInput, required: true }) }))

export const deleteManyDisqualifyReasonMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyDisqualifyReasonMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.disqualifyReason.deleteMany({ where: args.where }),
  }),
);

export const deleteManyDisqualifyReasonMutation = defineMutation((t) => ({
  deleteManyDisqualifyReason: t.field(deleteManyDisqualifyReasonMutationObject(t)),
}));
