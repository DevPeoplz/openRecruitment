import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEventScheduleEvaluationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventScheduleEvaluationWhereInput, required: true }) }))

export const deleteManyEventScheduleEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyEventScheduleEvaluationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventScheduleEvaluation.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEventScheduleEvaluationMutation = defineMutation((t) => ({
  deleteManyEventScheduleEvaluation: t.field(deleteManyEventScheduleEvaluationMutationObject(t)),
}));
