import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneEventScheduleEvaluationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventScheduleEvaluationWhereUniqueInput, required: true }) }))

export const deleteOneEventScheduleEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventScheduleEvaluation',
    nullable: true,
    args: deleteOneEventScheduleEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleEvaluation.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneEventScheduleEvaluationMutation = defineMutation((t) => ({
  deleteOneEventScheduleEvaluation: t.prismaField(deleteOneEventScheduleEvaluationMutationObject(t)),
}));
