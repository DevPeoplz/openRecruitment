import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyTaskMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TaskWhereInput, required: false }),
      data: t.field({ type: Inputs.TaskUpdateManyMutationInput, required: true }),
    }))

export const updateManyTaskMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyTaskMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.task.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyTaskMutation = defineMutation((t) => ({
  updateManyTask: t.field(updateManyTaskMutationObject(t)),
}));
