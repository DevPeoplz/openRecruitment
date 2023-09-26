import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneEventEvaluationMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.EventEvaluationCreateInput, required: true }) }))

export const createOneEventEvaluationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventEvaluation',
    nullable: false,
    args: createOneEventEvaluationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventEvaluation.create({ data: args.data, ...query }),
  }),
);

export const createOneEventEvaluationMutation = defineMutation((t) => ({
  createOneEventEvaluation: t.prismaField(createOneEventEvaluationMutationObject(t)),
}));
