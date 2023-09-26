import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyEvaluationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EvaluationWhereInput, required: false }),
      data: t.field({ type: Inputs.EvaluationUpdateManyMutationInput, required: true }),
    }))

export const updateManyEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyEvaluationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.evaluation.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyEvaluationMutation = defineMutation((t) => ({
  updateManyEvaluation: t.field(updateManyEvaluationMutationObject(t)),
}));
