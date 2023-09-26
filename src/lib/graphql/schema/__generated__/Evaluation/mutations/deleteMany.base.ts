import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEvaluationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EvaluationWhereInput, required: true }) }))

export const deleteManyEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyEvaluationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.evaluation.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEvaluationMutation = defineMutation((t) => ({
  deleteManyEvaluation: t.field(deleteManyEvaluationMutationObject(t)),
}));
