import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyTaskMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.TaskCreateInput], required: true }) }))

export const createManyTaskMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Task'],
    nullable: false,
    args: createManyTaskMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.task.create({ data }))),
  }),
);

export const createManyTaskMutation = defineMutation((t) => ({
  createManyTask: t.prismaField(createManyTaskMutationObject(t)),
}));
