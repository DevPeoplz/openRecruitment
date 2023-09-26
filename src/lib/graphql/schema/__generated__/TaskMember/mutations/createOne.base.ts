import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneTaskMemberMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.TaskMemberCreateInput, required: true }) }))

export const createOneTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TaskMember',
    nullable: false,
    args: createOneTaskMemberMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.create({ data: args.data, ...query }),
  }),
);

export const createOneTaskMemberMutation = defineMutation((t) => ({
  createOneTaskMember: t.prismaField(createOneTaskMemberMutationObject(t)),
}));
