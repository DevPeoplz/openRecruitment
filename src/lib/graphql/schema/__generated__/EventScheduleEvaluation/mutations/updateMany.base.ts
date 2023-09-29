import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyEventScheduleEvaluationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventScheduleEvaluationWhereInput, required: false }),
      data: t.field({ type: Inputs.EventScheduleEvaluationUpdateManyMutationInput, required: true }),
    }))

export const updateManyEventScheduleEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyEventScheduleEvaluationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventScheduleEvaluation.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyEventScheduleEvaluationMutation = defineMutation((t) => ({
  updateManyEventScheduleEvaluation: t.field(updateManyEventScheduleEvaluationMutationObject(t)),
}));
