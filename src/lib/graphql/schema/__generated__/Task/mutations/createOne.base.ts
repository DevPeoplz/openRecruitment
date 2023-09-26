import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneTaskMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.TaskCreateInput, required: true }) }))

export const createOneTaskMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Task',
    nullable: false,
    args: createOneTaskMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.task.create({ data: args.data, ...query }),
  }),
);

export const createOneTaskMutation = defineMutation((t) => ({
  createOneTask: t.prismaField(createOneTaskMutationObject(t)),
}));
