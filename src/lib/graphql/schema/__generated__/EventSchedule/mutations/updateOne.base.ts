import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneEventScheduleMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventScheduleWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.EventScheduleUpdateInput, required: true }),
    }))

export const updateOneEventScheduleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventSchedule',
    nullable: true,
    args: updateOneEventScheduleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventSchedule.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneEventScheduleMutation = defineMutation((t) => ({
  updateOneEventSchedule: t.prismaField(updateOneEventScheduleMutationObject(t)),
}));
