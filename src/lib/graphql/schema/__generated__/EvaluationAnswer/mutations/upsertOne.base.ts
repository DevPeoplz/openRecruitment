import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneEvaluationAnswerMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EvaluationAnswerWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.EvaluationAnswerCreateInput, required: true }),
      update: t.field({ type: Inputs.EvaluationAnswerUpdateInput, required: true }),
    }))

export const upsertOneEvaluationAnswerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EvaluationAnswer',
    nullable: false,
    args: upsertOneEvaluationAnswerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluationAnswer.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneEvaluationAnswerMutation = defineMutation((t) => ({
  upsertOneEvaluationAnswer: t.prismaField(upsertOneEvaluationAnswerMutationObject(t)),
}));
