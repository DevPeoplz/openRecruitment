import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyEventScheduleMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventScheduleWhereInput, required: false }),
      data: t.field({ type: Inputs.EventScheduleUpdateManyMutationInput, required: true }),
    }))

export const updateManyEventScheduleMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyEventScheduleMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.eventSchedule.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyEventScheduleMutation = defineMutation((t) => ({
  updateManyEventSchedule: t.field(updateManyEventScheduleMutationObject(t)),
}));
