import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneEventScheduleInterviewerMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.EventScheduleInterviewerCreateInput, required: true }) }))

export const createOneEventScheduleInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventScheduleInterviewer',
    nullable: false,
    args: createOneEventScheduleInterviewerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.create({ data: args.data, ...query }),
  }),
);

export const createOneEventScheduleInterviewerMutation = defineMutation((t) => ({
  createOneEventScheduleInterviewer: t.prismaField(createOneEventScheduleInterviewerMutationObject(t)),
}));
