import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyEvaluationAnswerMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EvaluationAnswerWhereInput, required: false }),
      data: t.field({ type: Inputs.EvaluationAnswerUpdateManyMutationInput, required: true }),
    }))

export const updateManyEvaluationAnswerMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyEvaluationAnswerMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.evaluationAnswer.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyEvaluationAnswerMutation = defineMutation((t) => ({
  updateManyEvaluationAnswer: t.field(updateManyEvaluationAnswerMutationObject(t)),
}));
