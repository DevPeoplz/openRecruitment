import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyDisqualifyReasonMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.DisqualifyReasonWhereInput, required: false }),
      data: t.field({ type: Inputs.DisqualifyReasonUpdateManyMutationInput, required: true }),
    }))

export const updateManyDisqualifyReasonMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyDisqualifyReasonMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.disqualifyReason.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyDisqualifyReasonMutation = defineMutation((t) => ({
  updateManyDisqualifyReason: t.field(updateManyDisqualifyReasonMutationObject(t)),
}));
