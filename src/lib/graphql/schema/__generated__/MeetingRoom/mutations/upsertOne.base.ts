import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneMeetingRoomMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.MeetingRoomWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.MeetingRoomCreateInput, required: true }),
      update: t.field({ type: Inputs.MeetingRoomUpdateInput, required: true }),
    }))

export const upsertOneMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'MeetingRoom',
    nullable: false,
    args: upsertOneMeetingRoomMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.meetingRoom.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneMeetingRoomMutation = defineMutation((t) => ({
  upsertOneMeetingRoom: t.prismaField(upsertOneMeetingRoomMutationObject(t)),
}));
