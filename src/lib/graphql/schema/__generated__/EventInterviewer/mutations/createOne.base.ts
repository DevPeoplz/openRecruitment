import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneEventInterviewerMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.EventInterviewerCreateInput, required: true }) }))

export const createOneEventInterviewerMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventInterviewer',
    nullable: false,
    args: createOneEventInterviewerMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventInterviewer.create({ data: args.data, ...query }),
  }),
);

export const createOneEventInterviewerMutation = defineMutation((t) => ({
  createOneEventInterviewer: t.prismaField(createOneEventInterviewerMutationObject(t)),
}));
