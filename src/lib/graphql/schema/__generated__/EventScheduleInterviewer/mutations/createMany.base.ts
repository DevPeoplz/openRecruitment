import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyEventScheduleInterviewerMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.EventScheduleInterviewerCreateInput], required: true }) }))

export const createManyEventScheduleInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['EventScheduleInterviewer'],
    nullable: false,
    args: createManyEventScheduleInterviewerMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.eventScheduleInterviewer.create({ data }))),
  }),
);

export const createManyEventScheduleInterviewerMutation = defineMutation((t) => ({
  createManyEventScheduleInterviewer: t.prismaField(createManyEventScheduleInterviewerMutationObject(t)),
}));
