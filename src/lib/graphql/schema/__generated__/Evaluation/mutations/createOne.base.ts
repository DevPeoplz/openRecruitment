import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneEvaluationMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.EvaluationCreateInput, required: true }) }))

export const createOneEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Evaluation',
    nullable: false,
    args: createOneEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.create({ data: args.data, ...query }),
  }),
);

export const createOneEvaluationMutation = defineMutation((t) => ({
  createOneEvaluation: t.prismaField(createOneEvaluationMutationObject(t)),
}));
