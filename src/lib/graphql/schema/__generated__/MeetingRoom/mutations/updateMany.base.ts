import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyMeetingRoomMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.MeetingRoomWhereInput, required: false }),
      data: t.field({ type: Inputs.MeetingRoomUpdateManyMutationInput, required: true }),
    }))

export const updateManyMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyMeetingRoomMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.meetingRoom.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyMeetingRoomMutation = defineMutation((t) => ({
  updateManyMeetingRoom: t.field(updateManyMeetingRoomMutationObject(t)),
}));
