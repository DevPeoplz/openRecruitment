import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneEventScheduleInterviewerMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventScheduleInterviewerWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.EventScheduleInterviewerUpdateInput, required: true }),
    }))

export const updateOneEventScheduleInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventScheduleInterviewer',
    nullable: true,
    args: updateOneEventScheduleInterviewerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneEventScheduleInterviewerMutation = defineMutation((t) => ({
  updateOneEventScheduleInterviewer: t.prismaField(updateOneEventScheduleInterviewerMutationObject(t)),
}));
