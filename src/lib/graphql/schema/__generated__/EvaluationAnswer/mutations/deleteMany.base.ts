import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEvaluationAnswerMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EvaluationAnswerWhereInput, required: true }) }))

export const deleteManyEvaluationAnswerMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyEvaluationAnswerMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.evaluationAnswer.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEvaluationAnswerMutation = defineMutation((t) => ({
  deleteManyEvaluationAnswer: t.field(deleteManyEvaluationAnswerMutationObject(t)),
}));
