import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneEventInterviewerMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventInterviewerWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.EventInterviewerUpdateInput, required: true }),
    }))

export const updateOneEventInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventInterviewer',
    nullable: true,
    args: updateOneEventInterviewerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventInterviewer.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneEventInterviewerMutation = defineMutation((t) => ({
  updateOneEventInterviewer: t.prismaField(updateOneEventInterviewerMutationObject(t)),
}));
