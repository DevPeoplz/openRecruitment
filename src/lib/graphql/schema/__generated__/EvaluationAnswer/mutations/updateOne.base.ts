import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneEvaluationAnswerMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EvaluationAnswerWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.EvaluationAnswerUpdateInput, required: true }),
    }))

export const updateOneEvaluationAnswerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EvaluationAnswer',
    nullable: true,
    args: updateOneEvaluationAnswerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluationAnswer.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneEvaluationAnswerMutation = defineMutation((t) => ({
  updateOneEvaluationAnswer: t.prismaField(updateOneEvaluationAnswerMutationObject(t)),
}));
