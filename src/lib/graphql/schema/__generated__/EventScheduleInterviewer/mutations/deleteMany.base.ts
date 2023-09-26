import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEventScheduleInterviewerMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventScheduleInterviewerWhereInput, required: true }) }))

export const deleteManyEventScheduleInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyEventScheduleInterviewerMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEventScheduleInterviewerMutation = defineMutation((t) => ({
  deleteManyEventScheduleInterviewer: t.field(deleteManyEventScheduleInterviewerMutationObject(t)),
}));
