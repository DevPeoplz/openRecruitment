import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneEventScheduleMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.EventScheduleWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.EventScheduleCreateInput, required: true }),
      update: t.field({ type: Inputs.EventScheduleUpdateInput, required: true }),
    }))

export const upsertOneEventScheduleMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'EventSchedule',
    nullable: false,
    args: upsertOneEventScheduleMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.eventSchedule.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneEventScheduleMutation = defineMutation((t) => ({
  upsertOneEventSchedule: t.prismaField(upsertOneEventScheduleMutationObject(t)),
}));
