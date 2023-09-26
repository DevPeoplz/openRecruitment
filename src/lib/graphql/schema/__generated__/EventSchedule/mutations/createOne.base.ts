import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneEventScheduleMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.EventScheduleCreateInput, required: true }) }))

export const createOneEventScheduleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventSchedule',
    nullable: false,
    args: createOneEventScheduleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventSchedule.create({ data: args.data, ...query }),
  }),
);

export const createOneEventScheduleMutation = defineMutation((t) => ({
  createOneEventSchedule: t.prismaField(createOneEventScheduleMutationObject(t)),
}));
