import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneEventEvaluationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventEvaluationWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.EventEvaluationCreateInput, required: true }),
      update: t.field({ type: Inputs.EventEvaluationUpdateInput, required: true }),
    }))

export const upsertOneEventEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventEvaluation',
    nullable: false,
    args: upsertOneEventEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventEvaluation.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneEventEvaluationMutation = defineMutation((t) => ({
  upsertOneEventEvaluation: t.prismaField(upsertOneEventEvaluationMutationObject(t)),
}));
