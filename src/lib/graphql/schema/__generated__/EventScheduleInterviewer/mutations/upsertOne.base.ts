import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneEventScheduleInterviewerMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventScheduleInterviewerWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.EventScheduleInterviewerCreateInput, required: true }),
      update: t.field({ type: Inputs.EventScheduleInterviewerUpdateInput, required: true }),
    }))

export const upsertOneEventScheduleInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventScheduleInterviewer',
    nullable: false,
    args: upsertOneEventScheduleInterviewerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneEventScheduleInterviewerMutation = defineMutation((t) => ({
  upsertOneEventScheduleInterviewer: t.prismaField(upsertOneEventScheduleInterviewerMutationObject(t)),
}));
