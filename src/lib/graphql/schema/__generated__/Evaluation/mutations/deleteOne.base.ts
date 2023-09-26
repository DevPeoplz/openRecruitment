import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneEvaluationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EvaluationWhereUniqueInput, required: true }) }))

export const deleteOneEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Evaluation',
    nullable: true,
    args: deleteOneEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.evaluation.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneEvaluationMutation = defineMutation((t) => ({
  deleteOneEvaluation: t.prismaField(deleteOneEvaluationMutationObject(t)),
}));
