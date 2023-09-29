import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyEventScheduleMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventScheduleWhereInput, required: true }) }))

export const deleteManyEventScheduleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyEventScheduleMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventSchedule.deleteMany({ where: args.where }),
  }),
);

export const deleteManyEventScheduleMutation = defineMutation((t) => ({
  deleteManyEventSchedule: t.field(deleteManyEventScheduleMutationObject(t)),
}));
