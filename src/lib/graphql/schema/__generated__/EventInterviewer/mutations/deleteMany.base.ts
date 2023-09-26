import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEventInterviewerMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventInterviewerWhereInput, required: true }) }))

export const deleteManyEventInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyEventInterviewerMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventInterviewer.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEventInterviewerMutation = defineMutation((t) => ({
  deleteManyEventInterviewer: t.field(deleteManyEventInterviewerMutationObject(t)),
}));
