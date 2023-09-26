import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyTaskMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TaskWhereInput, required: true }) }))

export const deleteManyTaskMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyTaskMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.task.deleteMany({ where: args.where }),
  }),
);

export const deleteManyTaskMutation = defineMutation((t) => ({
  deleteManyTask: t.field(deleteManyTaskMutationObject(t)),
}));
