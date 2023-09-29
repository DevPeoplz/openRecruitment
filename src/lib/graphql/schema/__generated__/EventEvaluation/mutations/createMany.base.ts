import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyEventEvaluationMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.EventEvaluationCreateInput], required: true }) }))

export const createManyEventEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['EventEvaluation'],
    nullable: false,
    args: createManyEventEvaluationMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.eventEvaluation.create({ data }))),
  }),
);

export const createManyEventEvaluationMutation = defineMutation((t) => ({
  createManyEventEvaluation: t.prismaField(createManyEventEvaluationMutationObject(t)),
}));
