import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyEventEvaluationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventEvaluationWhereInput, required: false }),
      data: t.field({ type: Inputs.EventEvaluationUpdateManyMutationInput, required: true }),
    }))

export const updateManyEventEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyEventEvaluationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventEvaluation.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyEventEvaluationMutation = defineMutation((t) => ({
  updateManyEventEvaluation: t.field(updateManyEventEvaluationMutationObject(t)),
}));
