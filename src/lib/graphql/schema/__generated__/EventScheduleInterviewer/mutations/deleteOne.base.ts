import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneEventScheduleInterviewerMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventScheduleInterviewerWhereUniqueInput, required: true }) }))

export const deleteOneEventScheduleInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventScheduleInterviewer',
    nullable: true,
    args: deleteOneEventScheduleInterviewerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventScheduleInterviewer.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneEventScheduleInterviewerMutation = defineMutation((t) => ({
  deleteOneEventScheduleInterviewer: t.prismaField(deleteOneEventScheduleInterviewerMutationObject(t)),
}));
