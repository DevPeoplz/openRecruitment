import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyEvaluationMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.EvaluationCreateInput], required: true }) }))

export const createManyEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Evaluation'],
    nullable: false,
    args: createManyEvaluationMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.evaluation.create({ data }))),
  }),
);

export const createManyEvaluationMutation = defineMutation((t) => ({
  createManyEvaluation: t.prismaField(createManyEvaluationMutationObject(t)),
}));
