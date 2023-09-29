import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyEventScheduleInterviewerMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventScheduleInterviewerWhereInput, required: false }),
      data: t.field({ type: Inputs.EventScheduleInterviewerUpdateManyMutationInput, required: true }),
    }))

export const updateManyEventScheduleInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyEventScheduleInterviewerMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyEventScheduleInterviewerMutation = defineMutation((t) => ({
  updateManyEventScheduleInterviewer: t.field(updateManyEventScheduleInterviewerMutationObject(t)),
}));
