import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneEventEvaluationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventEvaluationWhereUniqueInput, required: true }) }))

export const deleteOneEventEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventEvaluation',
    nullable: true,
    args: deleteOneEventEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventEvaluation.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneEventEvaluationMutation = defineMutation((t) => ({
  deleteOneEventEvaluation: t.prismaField(deleteOneEventEvaluationMutationObject(t)),
}));
