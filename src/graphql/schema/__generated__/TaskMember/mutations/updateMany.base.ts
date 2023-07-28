import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.TaskMemberWhereInput, required: false }),
      data: t.arg({ type: Inputs.TaskMemberUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await prisma.taskMember.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyTaskMemberMutation = defineMutation((t) => ({
  updateManyTaskMember: t.field(updateManyTaskMemberMutationObject(t)),
}));
