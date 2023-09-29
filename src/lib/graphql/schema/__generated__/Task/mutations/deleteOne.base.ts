import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneTaskMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TaskWhereUniqueInput, required: true }) }))

export const deleteOneTaskMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Task',
    nullable: true,
    args: deleteOneTaskMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.task.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneTaskMutation = defineMutation((t) => ({
  deleteOneTask: t.prismaField(deleteOneTaskMutationObject(t)),
}));
