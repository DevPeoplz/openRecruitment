import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyEventScheduleMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.EventScheduleCreateInput], required: true }) }))

export const createManyEventScheduleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['EventSchedule'],
    nullable: false,
    args: createManyEventScheduleMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.eventSchedule.create({ data }))),
  }),
);

export const createManyEventScheduleMutation = defineMutation((t) => ({
  createManyEventSchedule: t.prismaField(createManyEventScheduleMutationObject(t)),
}));
