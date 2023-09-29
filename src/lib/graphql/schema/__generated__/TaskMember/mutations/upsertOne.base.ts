import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneTaskMemberMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.TaskMemberWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.TaskMemberCreateInput, required: true }),
      update: t.field({ type: Inputs.TaskMemberUpdateInput, required: true }),
    }))

export const upsertOneTaskMemberMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'TaskMember',
    nullable: false,
    args: upsertOneTaskMemberMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.taskMember.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneTaskMemberMutation = defineMutation((t) => ({
  upsertOneTaskMember: t.prismaField(upsertOneTaskMemberMutationObject(t)),
}));
