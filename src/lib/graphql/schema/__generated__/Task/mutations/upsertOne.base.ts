import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneTaskMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TaskWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.TaskCreateInput, required: true }),
      update: t.field({ type: Inputs.TaskUpdateInput, required: true }),
    }))

export const upsertOneTaskMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Task',
    nullable: false,
    args: upsertOneTaskMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.task.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneTaskMutation = defineMutation((t) => ({
  upsertOneTask: t.prismaField(upsertOneTaskMutationObject(t)),
}));
