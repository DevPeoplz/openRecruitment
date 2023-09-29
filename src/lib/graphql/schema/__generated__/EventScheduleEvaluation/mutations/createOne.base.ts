import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneEventScheduleEvaluationMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.EventScheduleEvaluationCreateInput, required: true }) }))

export const createOneEventScheduleEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventScheduleEvaluation',
    nullable: false,
    args: createOneEventScheduleEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleEvaluation.create({ data: args.data, ...query }),
  }),
);

export const createOneEventScheduleEvaluationMutation = defineMutation((t) => ({
  createOneEventScheduleEvaluation: t.prismaField(createOneEventScheduleEvaluationMutationObject(t)),
}));
