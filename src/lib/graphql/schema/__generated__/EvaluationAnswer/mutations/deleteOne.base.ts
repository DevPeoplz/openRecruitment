import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneEvaluationAnswerMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EvaluationAnswerWhereUniqueInput, required: true }) }))

export const deleteOneEvaluationAnswerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EvaluationAnswer',
    nullable: true,
    args: deleteOneEvaluationAnswerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluationAnswer.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneEvaluationAnswerMutation = defineMutation((t) => ({
  deleteOneEvaluationAnswer: t.prismaField(deleteOneEvaluationAnswerMutationObject(t)),
}));
