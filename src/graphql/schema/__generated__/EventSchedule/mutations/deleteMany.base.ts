import * as Inputs from '@/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/prisma';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEventScheduleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.EventScheduleWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventSchedule.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEventScheduleMutation = defineMutation((t) => ({
  deleteManyEventSchedule: t.field(deleteManyEventScheduleMutationObject(t)),
}));
