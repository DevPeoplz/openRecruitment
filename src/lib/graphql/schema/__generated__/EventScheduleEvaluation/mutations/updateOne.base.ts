import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneEventScheduleEvaluationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventScheduleEvaluationWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.EventScheduleEvaluationUpdateInput, required: true }),
    }))

export const updateOneEventScheduleEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventScheduleEvaluation',
    nullable: true,
    args: updateOneEventScheduleEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleEvaluation.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneEventScheduleEvaluationMutation = defineMutation((t) => ({
  updateOneEventScheduleEvaluation: t.prismaField(updateOneEventScheduleEvaluationMutationObject(t)),
}));
