import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneEvaluationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EvaluationWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.EvaluationCreateInput, required: true }),
      update: t.field({ type: Inputs.EvaluationUpdateInput, required: true }),
    }))

export const upsertOneEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Evaluation',
    nullable: false,
    args: upsertOneEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneEvaluationMutation = defineMutation((t) => ({
  upsertOneEvaluation: t.prismaField(upsertOneEvaluationMutationObject(t)),
}));
