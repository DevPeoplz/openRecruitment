import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEventEvaluationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventEvaluationWhereInput, required: true }) }))

export const deleteManyEventEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyEventEvaluationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventEvaluation.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEventEvaluationMutation = defineMutation((t) => ({
  deleteManyEventEvaluation: t.field(deleteManyEventEvaluationMutationObject(t)),
}));
