import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneEventEvaluationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventEvaluationWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.EventEvaluationUpdateInput, required: true }),
    }))

export const updateOneEventEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventEvaluation',
    nullable: true,
    args: updateOneEventEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventEvaluation.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneEventEvaluationMutation = defineMutation((t) => ({
  updateOneEventEvaluation: t.prismaField(updateOneEventEvaluationMutationObject(t)),
}));
