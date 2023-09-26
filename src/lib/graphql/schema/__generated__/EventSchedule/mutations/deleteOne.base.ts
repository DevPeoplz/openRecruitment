import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneEventScheduleMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.EventScheduleWhereUniqueInput, required: true }) }))

export const deleteOneEventScheduleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventSchedule',
    nullable: true,
    args: deleteOneEventScheduleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventSchedule.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneEventScheduleMutation = defineMutation((t) => ({
  deleteOneEventSchedule: t.prismaField(deleteOneEventScheduleMutationObject(t)),
}));
