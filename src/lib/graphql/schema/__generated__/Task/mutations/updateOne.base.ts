import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneTaskMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TaskWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.TaskUpdateInput, required: true }),
    }))

export const updateOneTaskMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Task',
    nullable: true,
    args: updateOneTaskMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.task.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneTaskMutation = defineMutation((t) => ({
  updateOneTask: t.prismaField(updateOneTaskMutationObject(t)),
}));
