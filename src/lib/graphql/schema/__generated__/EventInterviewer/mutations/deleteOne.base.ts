import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneEventInterviewerMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventInterviewerWhereUniqueInput, required: true }) }))

export const deleteOneEventInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventInterviewer',
    nullable: true,
    args: deleteOneEventInterviewerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventInterviewer.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneEventInterviewerMutation = defineMutation((t) => ({
  deleteOneEventInterviewer: t.prismaField(deleteOneEventInterviewerMutationObject(t)),
}));
