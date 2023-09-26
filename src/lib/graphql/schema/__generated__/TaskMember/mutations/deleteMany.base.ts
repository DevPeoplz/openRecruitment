import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyTaskMemberMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TaskMemberWhereInput, required: true }) }))

export const deleteManyTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyTaskMemberMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.taskMember.deleteMany({ where: args.where }),
  }),
);

export const deleteManyTaskMemberMutation = defineMutation((t) => ({
  deleteManyTaskMember: t.field(deleteManyTaskMemberMutationObject(t)),
}));
