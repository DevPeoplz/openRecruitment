import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyEventScheduleEvaluationMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.EventScheduleEvaluationCreateInput], required: true }) }))

export const createManyEventScheduleEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['EventScheduleEvaluation'],
    nullable: false,
    args: createManyEventScheduleEvaluationMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.eventScheduleEvaluation.create({ data }))),
  }),
);

export const createManyEventScheduleEvaluationMutation = defineMutation((t) => ({
  createManyEventScheduleEvaluation: t.prismaField(createManyEventScheduleEvaluationMutationObject(t)),
}));
