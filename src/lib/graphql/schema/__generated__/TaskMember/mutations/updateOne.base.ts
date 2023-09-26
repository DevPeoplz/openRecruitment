import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneTaskMemberMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TaskMemberWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.TaskMemberUpdateInput, required: true }),
    }))

export const updateOneTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TaskMember',
    nullable: true,
    args: updateOneTaskMemberMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneTaskMemberMutation = defineMutation((t) => ({
  updateOneTaskMember: t.prismaField(updateOneTaskMemberMutationObject(t)),
}));
