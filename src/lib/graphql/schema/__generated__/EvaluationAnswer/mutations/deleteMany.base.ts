import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEvaluationAnswerMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.EvaluationAnswerWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.evaluationAnswer.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEvaluationAnswerMutation = defineMutation((t) => ({
  deleteManyEvaluationAnswer: t.field(deleteManyEvaluationAnswerMutationObject(t)),
}));
