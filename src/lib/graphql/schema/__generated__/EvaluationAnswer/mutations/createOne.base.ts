import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneEvaluationAnswerMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.EvaluationAnswerCreateInput, required: true }) }))

export const createOneEvaluationAnswerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EvaluationAnswer',
    nullable: false,
    args: createOneEvaluationAnswerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluationAnswer.create({ data: args.data, ...query }),
  }),
);

export const createOneEvaluationAnswerMutation = defineMutation((t) => ({
  createOneEvaluationAnswer: t.prismaField(createOneEvaluationAnswerMutationObject(t)),
}));
