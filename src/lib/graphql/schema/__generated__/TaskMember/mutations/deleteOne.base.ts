import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneTaskMemberMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.TaskMemberWhereUniqueInput, required: true }) }))

export const deleteOneTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TaskMember',
    nullable: true,
    args: deleteOneTaskMemberMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneTaskMemberMutation = defineMutation((t) => ({
  deleteOneTaskMember: t.prismaField(deleteOneTaskMemberMutationObject(t)),
}));
