import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyMeetingRoomMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.MeetingRoomCreateInput], required: true }) }))

export const createManyMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['MeetingRoom'],
    nullable: false,
    args: createManyMeetingRoomMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.meetingRoom.create({ data }))),
  }),
);

export const createManyMeetingRoomMutation = defineMutation((t) => ({
  createManyMeetingRoom: t.prismaField(createManyMeetingRoomMutationObject(t)),
}));
