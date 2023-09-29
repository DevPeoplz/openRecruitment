import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneEventScheduleEvaluationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventScheduleEvaluationWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.EventScheduleEvaluationCreateInput, required: true }),
      update: t.field({ type: Inputs.EventScheduleEvaluationUpdateInput, required: true }),
    }))

export const upsertOneEventScheduleEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventScheduleEvaluation',
    nullable: false,
    args: upsertOneEventScheduleEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleEvaluation.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneEventScheduleEvaluationMutation = defineMutation((t) => ({
  upsertOneEventScheduleEvaluation: t.prismaField(upsertOneEventScheduleEvaluationMutationObject(t)),
}));
