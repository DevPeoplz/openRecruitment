import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneEventInterviewerMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventInterviewerWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.EventInterviewerCreateInput, required: true }),
      update: t.field({ type: Inputs.EventInterviewerUpdateInput, required: true }),
    }))

export const upsertOneEventInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventInterviewer',
    nullable: false,
    args: upsertOneEventInterviewerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventInterviewer.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneEventInterviewerMutation = defineMutation((t) => ({
  upsertOneEventInterviewer: t.prismaField(upsertOneEventInterviewerMutationObject(t)),
}));
