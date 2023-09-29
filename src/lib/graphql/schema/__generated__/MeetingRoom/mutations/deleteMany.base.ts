import * as Inputs from '@/lib/graphql/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { prisma } from '@/lib/prisma';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyMeetingRoomMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.MeetingRoomWhereInput, required: true }) }))

export const deleteManyMeetingRoomMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyMeetingRoomMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.meetingRoom.deleteMany({ where: args.where }),
  }),
);

export const deleteManyMeetingRoomMutation = defineMutation((t) => ({
  deleteManyMeetingRoom: t.field(deleteManyMeetingRoomMutationObject(t)),
}));
